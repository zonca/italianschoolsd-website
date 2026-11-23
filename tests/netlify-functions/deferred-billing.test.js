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
        automatic_tax: { enabled: params.get('automatic_tax[enabled]') === 'true', status: 'complete' },
        metadata: Object.fromEntries([...params].filter(([k]) => k.startsWith('metadata[')).map(([k, v]) => [k.slice(9, -1), v])) };
      invoices.push(invoice); return invoice;
    }
    if (path === '/invoiceitems') {
      const invoice = invoices.find((i) => i.id === params.get('invoice'));
      assert.equal(params.get('customer'), 'cus_enrollment');
      assert.equal(params.get('currency'), 'usd');
      assert.ok(options.idempotencyKey);
      invoice.lines.data.push({ amount: Number(params.get('amount')),
        metadata: Object.fromEntries([...params].filter(([k]) => k.startsWith('metadata[')).map(([k, v]) => [k.slice(9, -1), v])) });
      invoice.amount_due = invoice.lines.data.reduce((sum, line) => sum + line.amount, 0);
      if (invoice.automatic_tax.enabled) {
        invoice.amount_due += invoice.lines.data.filter((line) => line.metadata.enrollment_component === 'book')
          .reduce((tax, line) => tax + Math.round(line.amount * 0.0775), 0);
      }
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
    const enrollment = session();
    // Keep this transport test in the future after the real term has ended.
    enrollment.metadata.charge_not_before = String(Math.floor(Date.now() / 1000) + 86400);
    await webhook.handleEvent({ type: 'checkout.session.completed', data: { object: enrollment } });
    assert.equal(fake.invoices.length, 5);
    assert.equal(fake.calls.filter((c) => c.params?.has('automatically_finalizes_at')).length, 5);
  } finally {
    global.fetch = originalFetch;
  }
});

const { quoteBook } = require('../../netlify/lib/checkout/book-tax');
const bookClass = CLASSES['spring-2027-beg-kearny-mesa'];
function bookSession(paymentType = 'monthly', familyMemberCount = 1, bookQuantity = 1) {
  const subtotal = 4900 * bookQuantity;
  const tax = Math.round(subtotal * 0.0775);
  const params = _test.buildCheckoutParams({ selectedClass: bookClass, paymentType, familyMemberCount,
    bookQuantity, bookQuote: { subtotal, tax, total: subtotal + tax, calculationId: 'taxcalc_quote' },
    monthlyCommitmentAccepted: true, origin: 'https://www.italianschoolsd.com', now: start - 86400 });
  return { id: 'cs_book_enrollment', mode: 'setup', customer: 'cus_enrollment', setup_intent: 'seti_enrollment',
    metadata: Object.fromEntries([...params].filter(([k]) => k.startsWith('metadata[')).map(([k, v]) => [k.slice(9, -1), v])) };
}

test('book tax is quoted for classroom pickup and zero-tax quotes fail closed', async() => {
  for (const id of ['spring-2027-beg-kearny-mesa', 'spring-2027-fri-beg-int-encinitas-daniela']) {
    const result = await quoteBook(CLASSES[id], 2, async(path, params) => {
      assert.equal(path, '/tax/calculations');
      assert.equal(params.get('customer_details[address_source]'), 'shipping');
      assert.equal(params.get('customer_details[address][postal_code]'), CLASSES[id].bookPickupAddress.postal_code);
      assert.equal(params.get('line_items[0][amount]'), '9800');
      assert.equal(params.get('line_items[0][tax_code]'), 'txcd_99999999');
      return { id: 'taxcalc_quote', amount_total: 10560, tax_amount_exclusive: 760 };
    });
    assert.equal(result.total, 10560);
  }
  await assert.rejects(quoteBook(bookClass, 1, async() => ({ id: 'taxcalc_zero', amount_total: 4900, tax_amount_exclusive: 0 })), /sales tax/);
});

test('early card authorization quotes the book once, with tax and exact first payment', () => {
  const subtotal = 4900;
  const params = _test.buildCheckoutParams({ selectedClass: bookClass, paymentType: 'monthly',
    bookQuantity: 1, bookQuote: { subtotal, tax: 380, total: 5280, calculationId: 'taxcalc_quote' },
    origin: 'https://www.italianschoolsd.com', monthlyCommitmentAccepted: true, now: start - 1 });
  assert.equal(params.get('billing_address_collection'), 'required');
  assert.equal(params.get('metadata[scheduled_amount]'), '14652');
  assert.equal(params.get('metadata[book_total]'), '5280');
  assert.match(params.get('custom_text[submit][message]'), /\$199\.32.*\$52\.80.*4 monthly payments of \$146\.52/);
  assert.throws(() => _test.buildCheckoutParams({ selectedClass: bookClass, paymentType: 'full',
    bookQuantity: 1, now: start - 1, origin: 'https://www.italianschoolsd.com' }), /verified book tax quote/);
});

test('early monthly book combo taxes the book on invoice 1 only and preserves all five tuition payments', async() => {
  const fake = fakeStripe();
  const enrollment = bookSession();
  await schedulePayments(enrollment, fake.request, start - 1);
  assert.deepEqual(fake.invoices.map((i) => i.amount_due), [19932, 14652, 14652, 14652, 14652]);
  assert.equal(fake.calls.filter((c) => c.params?.get('tax_code') === 'txcd_99999999').length, 1);
  assert.equal(fake.calls.find((c) => c.path === '/invoices').params.get('shipping_details[address][postal_code]'), '92123');
  await schedulePayments(enrollment, fake.request, start - 1);
  assert.equal(fake.invoices.length, 5);
  assert.equal(fake.calls.filter((c) => c.params?.get('metadata[enrollment_component]') === 'book').length, 1);
});

test('family full payment discounts tuition only and collects all books with sales tax on January 2', async() => {
  const fake = fakeStripe();
  await schedulePayments(bookSession('full', 2, 2), fake.request, start - 1);
  assert.equal(fake.invoices.length, 1);
  assert.equal(fake.invoices[0].amount_due, 137100);
  assert.deepEqual(fake.invoices[0].lines.data.map((line) => line.amount), [126540, 9800]);
  assert.equal(fake.calls.some((c) => c.path.endsWith('/pay')), false);
});

test('a book-line failure recovers without duplicating tuition or books', async() => {
  const fake = fakeStripe();
  const enrollment = bookSession('full');
  await assert.rejects(schedulePayments(enrollment, async(path, params, options) => {
    if (params?.get('metadata[enrollment_component]') === 'book') throw new Error('Interrupted book write');
    return fake.request(path, params, options);
  }, start - 1), /Interrupted/);
  assert.equal(fake.invoices[0].lines.data.length, 1);
  await schedulePayments(enrollment, fake.request, start - 1);
  assert.equal(fake.invoices.length, 1);
  assert.equal(fake.invoices[0].amount_due, 71880);
  assert.equal(fake.invoices[0].lines.data.length, 2);
});

test('missing or changed book tax prevents scheduling or collecting an invoice', async() => {
  const fake = fakeStripe();
  await assert.rejects(schedulePayments(bookSession('full'), async(path, params, options) => {
    const result = await fake.request(path, params, options);
    if (options?.method === 'GET' && result.lines?.data?.length === 2) result.amount_due -= 380;
    return result;
  }, start - 1), /book sales tax/);
  assert.equal(fake.calls.some((c) => c.params?.has('automatically_finalizes_at') || c.path.endsWith('/pay')), false);
});

test('a later book enrollment charges now and keeps the four remaining payments on enrollment anniversaries', async() => {
  const now = Date.parse('2027-01-10T12:00:00-08:00') / 1000;
  const params = _test.buildCheckoutParams({ selectedClass: bookClass, paymentType: 'monthly', bookQuantity: 1,
    bookQuote: { subtotal: 4900, tax: 380, total: 5280, calculationId: 'taxcalc_quote' },
    origin: 'https://www.italianschoolsd.com', monthlyCommitmentAccepted: true, now });
  assert.equal(Number(params.get('metadata[charge_not_before]')), now);
  assert.match(params.get('custom_text[submit][message]'), /\$199\.32 immediately.*4 monthly payments of \$146\.52/);
  assert.doesNotMatch(params.get('custom_text[submit][message]'), /No tuition/);
  const enrollment = bookSession();
  enrollment.metadata.charge_not_before = String(now);
  const fake = fakeStripe();
  await schedulePayments(enrollment, fake.request, now);
  assert.equal(fake.invoices[0].status, 'paid');
  assert.equal(fake.invoices[0].amount_due, 19932);
  assert.equal(fake.calls.filter((c) => c.path.endsWith('/pay')).length, 1);
  assert.deepEqual(fake.calls.filter((c) => c.params?.has('automatically_finalizes_at'))
    .map((c) => new Date(Number(c.params.get('automatically_finalizes_at')) * 1000).toISOString().slice(0, 10)),
  ['2027-02-10', '2027-03-10', '2027-04-10', '2027-05-10']);
});

test('only the two in-person beginner sections offer the book combo', () => {
  const sessionData = require('../../site/data/adult_january_may_2027.json');
  const offered = sessionData.classes.filter((c) => CLASSES[c.id].bookId);
  assert.deepEqual(offered.map((c) => c.id).sort(),
    ['spring-2027-beg-kearny-mesa', 'spring-2027-fri-beg-int-encinitas-daniela']);
  for (const sectionData of sessionData.classes) {
    const selection = _test.validateSelection({ classId: sectionData.id, paymentType: 'full',
      familyMemberCount: 1, bookQuantity: 1 });
    assert.equal(selection.error?.statusCode, CLASSES[sectionData.id].bookId ? undefined : 400);
  }
});

test('January 31 book enrollment charges once now and schedules the other four payments in distinct months', async() => {
  const now = Date.parse('2027-01-31T20:00:00Z') / 1000;
  const enrollment = bookSession();
  enrollment.metadata.charge_not_before = String(now);
  const fake = fakeStripe();
  await schedulePayments(enrollment, fake.request, now);
  assert.equal(fake.invoices.length, 5);
  assert.equal(fake.calls.filter((c) => c.path.endsWith('/pay')).length, 1);
  assert.deepEqual(fake.calls.filter((c) => c.params?.has('automatically_finalizes_at'))
    .map((c) => new Date(Number(c.params.get('automatically_finalizes_at')) * 1000).toISOString().slice(0, 10)),
  ['2027-02-28', '2027-03-31', '2027-04-30', '2027-05-31']);
});
