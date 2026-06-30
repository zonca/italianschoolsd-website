const assert = require('node:assert/strict');
const test = require('node:test');

const { CLASSES } = require('../../netlify/lib/checkout/catalog');
const { _test } = require('../../netlify/functions/create-checkout-session');

const ORIGIN = 'https://www.italianschoolsd.com';

test('pay-in-full checkout does not include recurring data or manual promotion codes', () => {
  const selectedClass = CLASSES['fall-2026-thu-beg'];
  const params = _test.buildCheckoutParams({
    selectedClass,
    paymentType: 'full',
    familyMemberCount: 1,
    bookQuantity: 0,
    origin: ORIGIN,
  });

  assert.equal(params.get('mode'), 'payment');
  assert.equal(params.get('allow_promotion_codes'), null);
  assert.equal(params.get('customer_creation'), 'if_required');
  assert.equal(params.get('line_items[0][price_data][product_data][name]'), `${selectedClass.name} - Student`);
  assert.equal(params.get('line_items[0][price_data][unit_amount]'), '57600');
  assert.equal(params.get('line_items[0][quantity]'), '1');
  assert.equal(params.get('line_items[0][price_data][product_data][tax_code]'), 'txcd_00000000');
  assert.equal(params.has('line_items[0][price_data][recurring][interval]'), false);
  assert.equal(params.has('line_items[1][price_data][product_data][name]'), false);
  assert.equal(params.has('optional_items[0][price]'), false);
  assert.equal(params.has('subscription_data[metadata][installments_total]'), false);
});

test('pay-in-full checkout discounts additional same-family students', () => {
  const selectedClass = CLASSES['fall-2026-thu-beg'];
  const params = _test.buildCheckoutParams({
    selectedClass,
    paymentType: 'full',
    familyMemberCount: 3,
    bookQuantity: 0,
    origin: ORIGIN,
  });

  assert.equal(params.get('metadata[family_member_count]'), '3');
  assert.equal(params.get('line_items[0][price_data][product_data][name]'), `${selectedClass.name} - Student`);
  assert.equal(params.get('line_items[0][price_data][unit_amount]'), '57600');
  assert.equal(params.get('line_items[0][quantity]'), '1');
  assert.equal(params.get('line_items[1][price_data][product_data][name]'), `${selectedClass.name} - Additional student from same family`);
  assert.equal(params.get('line_items[1][price_data][unit_amount]'), '51840');
  assert.equal(params.get('line_items[1][quantity]'), '2');
  assert.equal(params.get('line_items[1][price_data][product_data][metadata][family_discount]'), '10_percent');
});

test('monthly checkout uses subscription mode and one student', () => {
  const selectedClass = CLASSES['fall-2026-thu-beg'];
  const params = _test.buildCheckoutParams({
    selectedClass,
    paymentType: 'monthly',
    bookQuantity: 0,
    origin: ORIGIN,
  });

  assert.equal(params.get('mode'), 'subscription');
  assert.equal(params.get('customer_creation'), null);
  assert.equal(params.get('allow_promotion_codes'), null);
  assert.equal(params.get('metadata[family_member_count]'), '1');
  assert.equal(params.get('line_items[0][price_data][unit_amount]'), '12672');
  assert.equal(params.get('line_items[0][quantity]'), '1');
  assert.equal(params.get('line_items[0][price_data][recurring][interval]'), 'month');
  assert.equal(params.get('subscription_data[metadata][installments_total]'), '5');
  assert.equal(params.get('subscription_data[metadata][cancel_after_months]'), '5');
});

test('book checkout adds selected taxable book quantity', () => {
  const selectedClass = CLASSES['fall-2026-thu-beg'];
  const params = _test.buildCheckoutParams({
    selectedClass,
    paymentType: 'full',
    familyMemberCount: 2,
    bookQuantity: 2,
    origin: ORIGIN,
  });

  assert.equal(params.get('automatic_tax[enabled]'), 'true');
  assert.equal(params.get('billing_address_collection'), 'required');
  assert.equal(params.get('metadata[book_quantity]'), '2');
  assert.equal(params.get('line_items[2][price_data][product_data][name]'), 'The New Italian Project 1a');
  assert.equal(params.get('line_items[2][price_data][unit_amount]'), '4900');
  assert.equal(params.get('line_items[2][quantity]'), '2');
  assert.equal(params.get('line_items[2][price_data][product_data][tax_code]'), 'txcd_99999999');
  assert.equal(
    params.get('line_items[2][price_data][product_data][images][0]'),
    `${ORIGIN}/img/books/new-italian-project-1a.jpeg`
  );
  assert.equal(params.has('optional_items[0][price]'), false);
});

test('monthly checkout can include one book without changing class quantity', () => {
  const selectedClass = CLASSES['fall-2026-thu-beg'];
  const params = _test.buildCheckoutParams({
    selectedClass,
    paymentType: 'monthly',
    bookQuantity: 1,
    origin: ORIGIN,
  });

  assert.equal(params.get('mode'), 'subscription');
  assert.equal(params.get('line_items[0][quantity]'), '1');
  assert.equal(params.get('line_items[0][price_data][recurring][interval]'), 'month');
  assert.equal(params.get('line_items[1][price_data][product_data][name]'), 'The New Italian Project 1a');
  assert.equal(params.get('line_items[1][price_data][unit_amount]'), '4900');
  assert.equal(params.get('line_items[1][quantity]'), '1');
  assert.equal(params.has('line_items[1][price_data][recurring][interval]'), false);
});

test('Wednesday Fall classes have valid checkout catalog entries', () => {
  const beginner = CLASSES['fall-2026-wed-beg'];
  const beginnerIntermediate = CLASSES['fall-2026-wed-beg-int'];

  assert.equal(beginner.name, 'Fall 2026 Italian Class - Beginner Wednesday');
  assert.equal(beginner.anchor, 'wed-beg');
  assert.equal(beginner.bookId, 'project1a');
  assert.equal(beginnerIntermediate.name, 'Fall 2026 Italian Class - Beginner-Intermediate Wednesday');
  assert.equal(beginnerIntermediate.anchor, 'wed-beg-int');

  const params = _test.buildCheckoutParams({
    selectedClass: beginner,
    paymentType: 'full',
    familyMemberCount: 1,
    origin: ORIGIN,
  });

  assert.equal(
    params.get('success_url'),
    `${ORIGIN}/news/2026/06/beginner-adult-italian-classes-fall-2026/?checkout=success#wed-beg`
  );
});

test('unknown class and payment selections are rejected', () => {
  assert.equal(
    _test.validateSelection({ classId: 'missing', paymentType: 'full', familyMemberCount: 1, bookQuantity: 0 }).error.body,
    'Unknown class selection.'
  );
  assert.equal(
    _test.validateSelection({
      classId: 'fall-2026-thu-beg',
      paymentType: 'weekly',
      familyMemberCount: 1,
      bookQuantity: 0,
    }).error.body,
    'Unknown payment selection.'
  );
});

test('counts are bounded and monthly family count remains one', () => {
  assert.equal(_test.parseCount('2', 0), 2);
  assert.equal(_test.parseCount('missing', 4), 4);
  assert.equal(
    _test.validateSelection({
      classId: 'fall-2026-thu-beg',
      paymentType: 'full',
      familyMemberCount: 7,
      bookQuantity: 0,
    }).error.body,
    'Family member count must be between 1 and 6.'
  );
  assert.equal(
    _test.validateSelection({
      classId: 'fall-2026-thu-beg',
      paymentType: 'monthly',
      familyMemberCount: 2,
      bookQuantity: 0,
    }).error.body,
    'Monthly checkout is for one student at a time.'
  );
  assert.equal(
    _test.validateSelection({
      classId: 'fall-2026-thu-beg',
      paymentType: 'full',
      familyMemberCount: 1,
      bookQuantity: 7,
    }).error.body,
    'Book quantity must be between 0 and 6.'
  );
  assert.equal(
    _test.validateSelection({
      classId: 'fall-2026-thu-beg',
      paymentType: 'monthly',
      familyMemberCount: 1,
      bookQuantity: 2,
    }).error.body,
    'Monthly checkout allows at most 1 book.'
  );
  assert.equal(
    _test.validateSelection({
      classId: 'fall-2026-thu-beg-online',
      paymentType: 'full',
      familyMemberCount: 1,
      bookQuantity: 1,
    }).error.body,
    'Book purchase is not available for this class.'
  );
});
