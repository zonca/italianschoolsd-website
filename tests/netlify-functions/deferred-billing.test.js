const assert = require('node:assert/strict');
const test = require('node:test');
const { CLASSES } = require('../../netlify/lib/checkout/catalog');
const { _test } = require('../../netlify/functions/create-checkout-session');
const { schedulePayments, chargeStart } = require('../../netlify/lib/checkout/deferred-billing');

const start = Date.parse('2027-01-02T00:00:00-08:00') / 1000;
const section = CLASSES['spring-2027-mon-adv'];
function checkout(paymentType, now, familyMemberCount = 1) {
  return _test.buildCheckoutParams({ selectedClass: section, paymentType, now, familyMemberCount,
    origin: 'https://www.italianschoolsd.com', monthlyCommitmentAccepted: true });
}
function session(paymentType = 'monthly', now = start - 86400, family = 1) {
  const params = checkout(paymentType, now, family);
  return { id: 'cs_enrollment', mode: params.get('mode'), customer: 'cus_enrollment', setup_intent: 'seti_enrollment',
    metadata: Object.fromEntries([...params].filter(([k]) => k.startsWith('metadata['))
      .map(([k, v]) => [k.slice(9, -1), v])) };
}

function fakeStripe() {
  const invoices = [];
  const calls = [];
  const request = async(path, params, options = {}) => {
    calls.push({ path, params, options });
    if (path.startsWith('/setup_intents/')) return { status: 'succeeded', customer: 'cus_enrollment', payment_method: 'pm_saved' };
    if (path.startsWith('/invoices?')) return { data: invoices, has_more: false };
    if (path === '/invoices') {
      assert.equal(params.get('auto_advance'), 'false');
      assert.equal(params.get('pending_invoice_items_behavior'), 'exclude');
      assert.equal(params.get('default_payment_method'), 'pm_saved');
      assert.ok(options.idempotencyKey);
      const invoice = { id: `in_${invoices.length}`, status: 'draft', amount_due: 0, lines: { data: [] },
        metadata: Object.fromEntries([...params].filter(([k]) => k.startsWith('metadata[')).map(([k, v]) => [k.slice(9, -1), v])) };
      invoices.push(invoice); return invoice;
    }
    if (path === '/invoiceitems') {
      const invoice = invoices.find((i) => i.id === params.get('invoice'));
      assert.equal(params.get('customer'), 'cus_enrollment');
      assert.equal(params.get('currency'), 'usd');
      assert.ok(options.idempotencyKey);
      invoice.lines.data.push({ amount: Number(params.get('amount')) });
      invoice.amount_due = Number(params.get('amount'));
      return { id: 'ii_line' };
    }
    const invoice = invoices.find((i) => path.startsWith(`/invoices/${i.id}`));
    assert.ok(invoice, path);
    if (path.endsWith('/finalize')) invoice.status = 'open';
    if (path.endsWith('/pay')) invoice.status = 'paid';
    return invoice;
  };
  return { invoices, calls, request };
}

test('early full/family enrollment saves a card and quotes one discounted full payment without charging', () => {
  const p = checkout('full', start - 1, 2);
  assert.equal(p.get('mode'), 'setup');
  assert.equal(p.get('customer_creation'), 'always');
  assert.equal(p.has('setup_intent_data[usage]'), false);
  assert.equal(p.get('metadata[installments_total]'), '1');
  assert.equal(p.get('metadata[scheduled_amount]'), '105450');
  assert.equal(p.get('metadata[charge_not_before]'), String(start));
  assert.equal([...p.keys()].some((k) => k.startsWith('line_items[')), false);
  assert.match(p.get('custom_text[submit][message]'), /\$1054\.50.*January 2, 2027/);
});

test('all early enrollments, including January 1, use setup rather than an immediate charge or trial', () => {
  for (const now of [start - 40 * 86400, start - 86400, start - 1]) {
    const p = checkout('monthly', now);
    assert.equal(p.get('mode'), 'setup');
    assert.equal(p.get('metadata[scheduled_amount]'), '12210');
    assert.equal(p.get('metadata[installments_total]'), '5');
    assert.equal(p.has('subscription_data[trial_end]'), false);
  }
});

test('the cutoff is January 2 midnight Pacific, and on/after it both plans charge immediately', () => {
  assert.equal(chargeStart(section), start);
  for (const now of [start, start + 1, start + 10 * 86400]) {
    assert.equal(checkout('full', now).get('mode'), 'payment');
    assert.equal(checkout('monthly', now).get('mode'), 'subscription');
    assert.equal(checkout('full', now).get('line_items[0][price_data][unit_amount]'), '55500');
    assert.equal(checkout('monthly', now).get('line_items[0][price_data][unit_amount]'), '12210');
  }
});

test('legacy enrollment still charges immediately before January 2', () => {
  const p = _test.buildCheckoutParams({ selectedClass: CLASSES['fall-2026-mon-int'], paymentType: 'full',
    origin: 'https://www.italianschoolsd.com', now: start - 86400 });
  assert.equal(p.get('mode'), 'payment');
});

test('early installments create exactly five scheduled invoices and no early charge', async() => {
  const fake = fakeStripe();
  await schedulePayments(session(), fake.request, start - 1);
  assert.equal(fake.invoices.length, 5);
  assert.deepEqual(fake.calls.filter((c) => c.params?.has('automatically_finalizes_at'))
    .map((c) => new Date(Number(c.params.get('automatically_finalizes_at')) * 1000).toISOString().slice(0, 10)),
  ['2027-01-02', '2027-02-02', '2027-03-02', '2027-04-02', '2027-05-02']);
  assert.ok(fake.invoices.every((i) => i.amount_due === 12210));
  assert.equal(fake.calls.some((c) => /\/(pay|finalize)$/.test(c.path)), false);
});

test('early full payment schedules exactly one full tuition invoice', async() => {
  const fake = fakeStripe();
  await schedulePayments(session('full'), fake.request, start - 1);
  assert.equal(fake.invoices.length, 1);
  assert.equal(fake.invoices[0].amount_due, 55500);
  assert.equal(fake.calls.find((c) => c.params?.has('automatically_finalizes_at')).params.get('automatically_finalizes_at'), String(start));
});

test('replayed webhooks reuse the durable invoice records instead of duplicating tuition', async() => {
  const fake = fakeStripe();
  const s = session();
  await schedulePayments(s, fake.request, start - 3 * 86400);
  await schedulePayments(s, fake.request, start - 86400);
  assert.equal(fake.invoices.length, 5);
  assert.equal(fake.calls.filter((c) => c.path === '/invoiceitems').length, 5);
});

test('a setup completed or delivered after January 2 charges the first installment immediately', async() => {
  const fake = fakeStripe();
  const s = session();
  await schedulePayments(s, fake.request, start + 60);
  assert.equal(fake.calls.filter((c) => c.path.endsWith('/pay')).length, 1);
  assert.equal(fake.invoices[0].status, 'paid');
  await schedulePayments(s, fake.request, start + 86400);
  assert.equal(fake.calls.filter((c) => c.path.endsWith('/pay')).length, 1);
  assert.equal(fake.invoices.length, 5);
});

test('an incomplete or mismatched saved card cannot schedule payments', async() => {
  await assert.rejects(schedulePayments(session(), async() => ({ status: 'processing', customer: 'cus_enrollment' })), /not successfully saved/);
  await assert.rejects(schedulePayments(session(), async() => ({
    status: 'succeeded', customer: 'cus_other', payment_method: 'pm_saved',
  })), /not successfully saved/);
});

test('mismatched invoice amounts fail closed without adding another line or collecting payment', async() => {
  const fake = fakeStripe();
  await schedulePayments(session('full'), fake.request, start - 1);
  fake.invoices[0].amount_due = 1;
  await assert.rejects(schedulePayments(session('full'), fake.request, start + 1), /authorized amount/);
  assert.equal(fake.calls.some((c) => c.path.endsWith('/pay')), false);
});

test('the Checkout webhook schedules saved-card tuition through the Stripe HTTP transport', async() => {
  const { _test: webhook } = require('../../netlify/functions/stripe-webhook');
  const fake = fakeStripe();
  const originalFetch = global.fetch;
  global.fetch = async(url, options) => {
    if (options.method === 'GET') assert.equal(options.body, undefined);
    const result = await fake.request(url.replace('https://api.stripe.com/v1', ''), options.body,
      { method: options.method, idempotencyKey: options.headers['Idempotency-Key'] });
    return { ok: true, json: async() => result };
  };
  try {
    await webhook.handleEvent({ type: 'checkout.session.completed', data: { object: session() } });
    assert.equal(fake.invoices.length, 5);
    assert.equal(fake.calls.filter((c) => c.params?.has('automatically_finalizes_at')).length, 5);
  } finally {
    global.fetch = originalFetch;
  }
});
