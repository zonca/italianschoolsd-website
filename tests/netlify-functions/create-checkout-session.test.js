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
    additionalFamilyMemberPriceId: 'price_additional_member',
    origin: ORIGIN,
  });

  assert.equal(params.get('mode'), 'payment');
  assert.equal(params.get('allow_promotion_codes'), null);
  assert.equal(params.get('customer_creation'), 'if_required');
  assert.equal(params.get('line_items[0][price_data][product_data][name]'), `${selectedClass.name} - First family member`);
  assert.equal(params.get('line_items[0][price_data][unit_amount]'), '57600');
  assert.equal(params.get('line_items[0][quantity]'), '1');
  assert.equal(params.get('line_items[0][price_data][product_data][tax_code]'), 'txcd_00000000');
  assert.equal(params.get('optional_items[0][price]'), 'price_additional_member');
  assert.equal(params.get('optional_items[0][quantity]'), '1');
  assert.equal(params.get('optional_items[0][adjustable_quantity][enabled]'), 'true');
  assert.equal(params.get('optional_items[0][adjustable_quantity][minimum]'), '1');
  assert.equal(params.get('optional_items[0][adjustable_quantity][maximum]'), '5');
  assert.equal(params.has('line_items[0][price_data][recurring][interval]'), false);
  assert.equal(params.has('subscription_data[metadata][installments_total]'), false);
});

test('pay-in-full checkout requires an additional family member Stripe price', () => {
  const selectedClass = CLASSES['fall-2026-thu-beg'];
  assert.throws(
    () => _test.buildCheckoutParams({
      selectedClass,
      paymentType: 'full',
      origin: ORIGIN,
    }),
    /requires a Stripe additional family member price/
  );
});

test('monthly checkout uses subscription mode and never sends customer_creation', () => {
  const selectedClass = CLASSES['fall-2026-thu-beg'];
  const params = _test.buildCheckoutParams({
    selectedClass,
    paymentType: 'monthly',
    origin: ORIGIN,
  });

  assert.equal(params.get('mode'), 'subscription');
  assert.equal(params.get('customer_creation'), null);
  assert.equal(params.get('allow_promotion_codes'), null);
  assert.equal(params.get('line_items[0][price_data][unit_amount]'), '12672');
  assert.equal(params.get('line_items[0][quantity]'), '1');
  assert.equal(params.get('metadata[quantity_choice]'), 'one_student');
  assert.equal(params.get('line_items[0][price_data][recurring][interval]'), 'month');
  assert.equal(params.get('subscription_data[metadata][installments_total]'), '5');
  assert.equal(params.get('subscription_data[metadata][cancel_after_months]'), '5');
});

test('book checkout adds optional taxable book item with adjustable quantity', () => {
  const selectedClass = CLASSES['fall-2026-thu-beg'];
  const params = _test.buildCheckoutParams({
    selectedClass,
    paymentType: 'full',
    additionalFamilyMemberPriceId: 'price_additional_member',
    bookPriceId: 'price_book_project1a',
    origin: ORIGIN,
  });

  assert.equal(params.get('automatic_tax[enabled]'), 'true');
  assert.equal(params.get('billing_address_collection'), 'required');
  assert.equal(params.get('metadata[book_choice]'), 'optional_in_checkout');
  assert.equal(params.get('optional_items[0][price]'), 'price_book_project1a');
  assert.equal(params.get('optional_items[0][quantity]'), '1');
  assert.equal(params.get('optional_items[0][adjustable_quantity][enabled]'), 'true');
  assert.equal(params.get('optional_items[0][adjustable_quantity][minimum]'), '1');
  assert.equal(params.get('optional_items[0][adjustable_quantity][maximum]'), '6');
  assert.equal(params.get('optional_items[1][price]'), 'price_additional_member');
  assert.equal(params.get('optional_items[1][adjustable_quantity][maximum]'), '5');
});

test('monthly checkout can offer an optional book without changing class quantity', () => {
  const selectedClass = CLASSES['fall-2026-thu-beg'];
  const params = _test.buildCheckoutParams({
    selectedClass,
    paymentType: 'monthly',
    bookPriceId: 'price_book_project1a',
    origin: ORIGIN,
  });

  assert.equal(params.get('mode'), 'subscription');
  assert.equal(params.get('line_items[0][quantity]'), '1');
  assert.equal(params.get('line_items[0][price_data][recurring][interval]'), 'month');
  assert.equal(params.get('optional_items[0][price]'), 'price_book_project1a');
  assert.equal(params.get('optional_items[0][adjustable_quantity][enabled]'), 'true');
  assert.equal(params.get('metadata[quantity_choice]'), 'one_student');
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
    additionalFamilyMemberPriceId: 'price_additional_member',
    origin: ORIGIN,
  });

  assert.equal(
    params.get('success_url'),
    `${ORIGIN}/news/2026/06/beginner-adult-italian-classes-fall-2026/?checkout=success#wed-beg`
  );
});

test('unknown class and payment selections are rejected', () => {
  assert.equal(
    _test.validateSelection({ classId: 'missing', paymentType: 'full' }).error.body,
    'Unknown class selection.'
  );
  assert.equal(
    _test.validateSelection({ classId: 'fall-2026-thu-beg', paymentType: 'weekly' }).error.body,
    'Unknown payment selection.'
  );
});
