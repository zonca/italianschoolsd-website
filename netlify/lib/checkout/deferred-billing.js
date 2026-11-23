function chargeStart(selectedClass) {
  return selectedClass.chargeNotBefore
    ? Math.floor(Date.parse(selectedClass.chargeNotBefore) / 1000) : 0;
}

function quoteAmount(selectedClass, paymentType, familyMemberCount = 1) {
  return paymentType === 'monthly' ? selectedClass.monthlyAmount
    : selectedClass.fullAmount + (familyMemberCount - 1) * Math.round(selectedClass.fullAmount * 0.9);
}

function addMonths(timestamp, months) {
  const date = new Date(timestamp * 1000);
  date.setUTCMonth(date.getUTCMonth() + months);
  return Math.floor(date.getTime() / 1000);
}

// The signed Checkout webhook is the only caller. Stripe owns the future
// invoice finalization/payment attempts; no local timer or cron is required.
async function schedulePayments(session, request, now = Math.floor(Date.now() / 1000)) {
  const meta = session.metadata || {};
  if (session.mode !== 'setup' || meta.deferred_billing !== 'true') return;
  if (!session.customer || !session.setup_intent) throw new Error('Deferred enrollment is missing customer or SetupIntent');
  const amount = Number(meta.scheduled_amount);
  const start = Number(meta.charge_not_before);
  const count = Number(meta.installments_total);
  if (!Number.isSafeInteger(amount) || amount <= 0 || !Number.isSafeInteger(start) || start <= 0
      || !['full', 'monthly'].includes(meta.payment_type)
      || !Number.isInteger(count) || count < 1 || count > 24
      || (meta.payment_type === 'full' && count !== 1)) {
    throw new Error('Invalid deferred payment metadata');
  }
  const setup = await request(`/setup_intents/${session.setup_intent}`, null, { method: 'GET' });
  if (setup.status !== 'succeeded' || setup.customer !== session.customer || !setup.payment_method) {
    throw new Error('Deferred payment method is not successfully saved for this customer');
  }

  // Recover existing invoices even when Stripe retries a webhook after its
  // 24-hour idempotency-key retention window. Each Setup Checkout creates its
  // own customer, so invoices are never shared with another enrollment.
  const existing = [];
  let after;
  do {
    const query = new URLSearchParams({ customer: session.customer, limit: '100' });
    if (after) query.set('starting_after', after);
    const page = await request(`/invoices?${query}`, null, { method: 'GET' });
    existing.push(...page.data);
    after = page.has_more ? page.data.at(-1)?.id : null;
    if (page.has_more && !after) throw new Error('Cannot paginate deferred invoices');
  } while (after);

  for (let installment = 1; installment <= count; installment += 1) {
    const key = `enrollment-${session.id}-${installment}`;
    const due = addMonths(start, installment - 1);
    const matches = existing.filter((invoice) => invoice.metadata?.checkout_session_id === session.id
      && invoice.metadata?.installment_number === String(installment));
    if (matches.length > 1) throw new Error(`Duplicate deferred invoices for ${key}`);
    let invoice = matches[0];
    if (!invoice) {
      const params = new URLSearchParams({ customer: session.customer, collection_method: 'charge_automatically',
        default_payment_method: setup.payment_method, auto_advance: 'false', pending_invoice_items_behavior: 'exclude' });
      for (const [name, value] of Object.entries({ checkout_session_id: session.id, class_id: meta.class_id,
        payment_type: meta.payment_type, installment_number: installment, installments_total: count, scheduled_charge_at: due })) {
        params.set(`metadata[${name}]`, String(value));
      }
      invoice = await request('/invoices', params, { idempotencyKey: `${key}-invoice` });
    }
    invoice = await request(`/invoices/${invoice.id}`, null, { method: 'GET' });
    if (invoice.status === 'void' || invoice.status === 'uncollectible') {
      throw new Error(`Deferred invoice ${invoice.id} requires manual review`);
    }
    const lines = invoice.lines?.data || [];
    if (lines.length === 0 && invoice.status === 'draft') {
      const params = new URLSearchParams({ customer: session.customer, invoice: invoice.id, amount: String(amount),
        currency: 'usd', description: `${meta.enrollment_name} - ${meta.payment_type === 'monthly' ? `payment ${installment} of ${count}` : 'full session'}` });
      await request('/invoiceitems', params, { idempotencyKey: `${key}-line` });
      invoice = await request(`/invoices/${invoice.id}`, null, { method: 'GET' });
    }
    if (invoice.amount_due !== amount || invoice.lines?.data?.length !== 1) {
      throw new Error(`Deferred invoice ${invoice.id} does not match the authorized amount`);
    }
    if (invoice.status === 'paid') continue;
    if (due > now && invoice.status === 'draft') {
      await request(`/invoices/${invoice.id}`, new URLSearchParams({ auto_advance: 'true', automatically_finalizes_at: String(due) }),
        { idempotencyKey: `${key}-schedule` });
    } else if (due <= now) {
      if (invoice.status === 'draft') {
        await request(`/invoices/${invoice.id}/finalize`, new URLSearchParams({ auto_advance: 'false' }),
          { idempotencyKey: `${key}-finalize` });
      }
      await request(`/invoices/${invoice.id}/pay`, new URLSearchParams({ off_session: 'true' }),
        { idempotencyKey: `${key}-pay` });
    } else if (invoice.status !== 'open') {
      throw new Error(`Unexpected deferred invoice state: ${invoice.status}`);
    }
  }
}

module.exports = { chargeStart, quoteAmount, schedulePayments };
