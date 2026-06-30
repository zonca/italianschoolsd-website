const assert = require('node:assert/strict');
const test = require('node:test');

const { CLASSES } = require('../../netlify/lib/checkout/catalog');
const { _test } = require('../../netlify/functions/create-checkout-session');

const ORIGIN = 'https://www.italianschoolsd.com';

function entries(params, key) {
  return params.getAll(key);
}

test('pay-in-full checkout does not include recurring data or manual promotion codes', () => {
  const selectedClass = CLASSES['fall-2026-thu-beg'];
  const params = _test.buildCheckoutParams({
    selectedClass,
    paymentType: 'full',
    includeBook: false,
    studentCount: 1,
    origin: ORIGIN,
  });

  assert.equal(params.get('mode'), 'payment');
  assert.equal(params.get('allow_promotion_codes'), null);
  assert.equal(params.get('customer_creation'), 'if_required');
  assert.equal(params.get('line_items[0][price_data][unit_amount]'), '57600');
  assert.equal(params.get('line_items[0][quantity]'), '1');
  assert.equal(params.get('line_items[0][price_data][product_data][tax_code]'), 'txcd_00000000');
  assert.equal(params.has('line_items[0][price_data][recurring][interval]'), false);
  assert.equal(params.has('subscription_data[metadata][installments_total]'), false);
});

test('pay-in-full checkout discounts only additional same-class family members', () => {
  const selectedClass = CLASSES['fall-2026-thu-beg'];
  const params = _test.buildCheckoutParams({
    selectedClass,
    paymentType: 'full',
    includeBook: false,
    studentCount: 3,
    origin: ORIGIN,
  });

  assert.equal(params.get('mode'), 'payment');
  assert.equal(params.get('line_items[0][price_data][product_data][name]'), `${selectedClass.name} - First family member`);
  assert.equal(params.get('line_items[0][price_data][unit_amount]'), '57600');
  assert.equal(params.get('line_items[0][quantity]'), '1');
  assert.equal(params.get('line_items[1][price_data][product_data][name]'), `${selectedClass.name} - Additional family member`);
  assert.equal(params.get('line_items[1][price_data][unit_amount]'), '51840');
  assert.equal(params.get('line_items[1][quantity]'), '2');
  assert.equal(params.get('line_items[1][price_data][product_data][metadata][family_discount]'), '10_percent');
  assert.equal(params.get('metadata[student_count]'), '3');
});

test('monthly checkout uses subscription mode and never sends customer_creation', () => {
  const selectedClass = CLASSES['fall-2026-thu-beg'];
  const params = _test.buildCheckoutParams({
    selectedClass,
    paymentType: 'monthly',
    includeBook: false,
    studentCount: 1,
    origin: ORIGIN,
  });

  assert.equal(params.get('mode'), 'subscription');
  assert.equal(params.get('customer_creation'), null);
  assert.equal(params.get('allow_promotion_codes'), null);
  assert.equal(params.get('line_items[0][price_data][unit_amount]'), '12672');
  assert.equal(params.get('line_items[0][price_data][recurring][interval]'), 'month');
  assert.equal(params.get('subscription_data[metadata][installments_total]'), '5');
  assert.equal(params.get('subscription_data[metadata][cancel_after_months]'), '5');
});

test('book checkout adds taxable book line with public image URL', () => {
  const selectedClass = CLASSES['fall-2026-thu-beg'];
  const params = _test.buildCheckoutParams({
    selectedClass,
    paymentType: 'full',
    includeBook: true,
    studentCount: 2,
    origin: ORIGIN,
  });

  assert.equal(params.get('automatic_tax[enabled]'), 'true');
  assert.equal(params.get('billing_address_collection'), 'required');
  assert.equal(params.get('line_items[2][price_data][unit_amount]'), '4900');
  assert.equal(params.get('line_items[2][quantity]'), '2');
  assert.equal(params.get('line_items[2][price_data][product_data][tax_code]'), 'txcd_99999999');
  assert.equal(
    params.get('line_items[2][price_data][product_data][images][0]'),
    `${ORIGIN}/img/books/new-italian-project-1a.jpeg`
  );
  assert.deepEqual(entries(params, 'metadata[includes_book]'), ['yes']);
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
    includeBook: false,
    studentCount: 1,
    origin: ORIGIN,
  });

  assert.equal(
    params.get('success_url'),
    `${ORIGIN}/news/2026/06/beginner-adult-italian-classes-fall-2026/?checkout=success#wed-beg`
  );
});

test('online classes cannot include school-sold book bundle', () => {
  const result = _test.validateSelection({
    classId: 'fall-2026-thu-beg-online',
    paymentType: 'full',
    includeBook: true,
    studentCount: 1,
  });

  assert.equal(result.error.statusCode, 400);
  assert.equal(result.error.body, 'Book purchase is not available for this class.');
});

test('unknown class and payment selections are rejected', () => {
  assert.equal(
    _test.validateSelection({ classId: 'missing', paymentType: 'full', includeBook: false }).error.body,
    'Unknown class selection.'
  );
  assert.equal(
    _test.validateSelection({ classId: 'fall-2026-thu-beg', paymentType: 'weekly', includeBook: false, studentCount: 1 }).error.body,
    'Unknown payment selection.'
  );
});

test('student counts are bounded and multi-student checkout is pay-in-full only', () => {
  assert.equal(_test.parseStudentCount('2'), 2);
  assert.equal(_test.parseStudentCount('bad'), 1);
  assert.equal(
    _test.validateSelection({ classId: 'fall-2026-thu-beg', paymentType: 'full', includeBook: false, studentCount: 7 }).error.body,
    'Student count must be between 1 and 6.'
  );
  assert.equal(
    _test.validateSelection({ classId: 'fall-2026-thu-beg', paymentType: 'monthly', includeBook: false, studentCount: 2 }).error.body,
    'Monthly payment checkout is for one student at a time. Use pay-in-full checkout to enroll multiple family members together.'
  );
});
