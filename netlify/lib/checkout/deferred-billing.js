const { BOOKS, CLASSES } = require('./catalog');

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
  const bookQuantity = Number(meta.book_quantity || 0);
  const bookSubtotal = Number(meta.book_subtotal || 0);
  const bookTax = Number(meta.book_tax || 0);
  const bookTotal = Number(meta.book_total || 0);
  const book = BOOKS[meta.book_id];
  const selectedClass = CLASSES[meta.class_id];
  if (!Number.isSafeInteger(amount) || amount <= 0 || !Number.isSafeInteger(start) || start <= 0
      || !['full', 'monthly'].includes(meta.payment_type)
      || !Number.isInteger(count) || count < 1 || count > 24
      || (meta.payment_type === 'full' && count !== 1)) {
    throw new Error('Invalid deferred payment metadata');
  }
  if (!Number.isInteger(bookQuantity) || bookQuantity < 0 || bookQuantity > 6
      || (meta.payment_type === 'monthly' && bookQuantity > 1)
      || (bookQuantity > 0 && (!book || selectedClass?.bookId !== book.id || !selectedClass.bookPickupAddress
        || !Number.isSafeInteger(bookSubtotal) || bookSubtotal <= 0
        || !Number.isSafeInteger(bookTax) || bookTax <= 0 || bookTotal !== bookSubtotal + bookTax || !meta.book_tax_calculation))) {
    throw new Error('Invalid deferred book metadata');
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
    const includesBook = installment === 1 && bookQuantity > 0;
    const authorizedAmount = amount + (includesBook ? bookTotal : 0);
    const key = `enrollment-${session.id}-${installment}`;
    const due = addMonths(start, installment - 1);
    const matches = existing.filter((invoice) => invoice.metadata?.checkout_session_id === session.id
      && invoice.metadata?.installment_number === String(installment));
    if (matches.length > 1) throw new Error(`Duplicate deferred invoices for ${key}`);
    let invoice = matches[0];
    if (!invoice) {
      const params = new URLSearchParams({ customer: session.customer, collection_method: 'charge_automatically',
        default_payment_method: setup.payment_method, auto_advance: 'false', pending_invoice_items_behavior: 'exclude' });
      if (includesBook) {
        params.set('automatic_tax[enabled]', 'true');
        params.set('shipping_details[name]', 'Classroom book pickup');
        for (const [name, value] of Object.entries(selectedClass.bookPickupAddress)) {
          params.set(`shipping_details[address][${name}]`, value);
        }
      }
      for (const [name, value] of Object.entries({ checkout_session_id: session.id, class_id: meta.class_id,
        payment_type: meta.payment_type, installment_number: installment, installments_total: count, scheduled_charge_at: due,
        book_quantity: includesBook ? bookQuantity : 0 })) {
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
        currency: 'usd', 'metadata[enrollment_component]': 'tuition',
        description: `${meta.enrollment_name} - ${meta.payment_type === 'monthly' ? `payment ${installment} of ${count}` : 'full session'}` });
      if (includesBook) {
        params.set('tax_code', 'txcd_00000000');
        params.set('tax_behavior', 'exclusive');
      }
      await request('/invoiceitems', params, { idempotencyKey: `${key}-line` });
      invoice = await request(`/invoices/${invoice.id}`, null, { method: 'GET' });
    }
    if (includesBook && invoice.status === 'draft' && invoice.lines?.data?.length === 1
        && invoice.lines.data[0].metadata?.enrollment_component === 'tuition') {
      const params = new URLSearchParams({ customer: session.customer, invoice: invoice.id,
        amount: String(bookSubtotal), currency: 'usd', tax_code: 'txcd_99999999', tax_behavior: 'exclusive',
        description: `${bookQuantity} x ${book.name} - classroom pickup`,
        'metadata[enrollment_component]': 'book', 'metadata[book_id]': book.id,
        'metadata[book_quantity]': String(bookQuantity), 'metadata[tax_calculation]': meta.book_tax_calculation });
      await request('/invoiceitems', params, { idempotencyKey: `${key}-book` });
      invoice = await request(`/invoices/${invoice.id}`, null, { method: 'GET' });
    }
    if (includesBook && (invoice.automatic_tax?.enabled !== true || invoice.automatic_tax?.status !== 'complete'
        || invoice.amount_due - amount - bookSubtotal !== bookTax)) {
      throw new Error(`Deferred invoice ${invoice.id} book sales tax does not match the authorized quote`);
    }
    if (invoice.amount_due !== authorizedAmount || invoice.lines?.data?.length !== (includesBook ? 2 : 1)) {
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
