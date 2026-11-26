const assert = require('node:assert/strict');
const test = require('node:test');
const { _test } = require('../../netlify/functions/create-checkout-session');

const JAN_2 = Date.parse('2027-01-02T00:00:00-08:00') / 1000;

for (const classId of ['jan-2027-tue-german-beg', 'jan-2027-tue-spanish-beg']) {
  test(`${classId} saves the card and schedules tuition from January 2, like the Italian classes`, () => {
    for (const [paymentType, count, amount, family] of [['full', '1', '38000', 1], ['full', '1', '72200', 2], ['monthly', '3', '13940', 1]]) {
      const { selectedClass, error } = _test.validateSelection({ classId, paymentType,
        familyMemberCount: family, bookQuantity: 0, monthlyCommitmentAccepted: true });
      assert.equal(error, undefined);
      const params = _test.buildCheckoutParams({ selectedClass, paymentType, familyMemberCount: family,
        origin: 'https://www.italianschoolsd.com', monthlyCommitmentAccepted: true,
        now: Date.parse('2026-11-26T12:00:00-08:00') / 1000 });
      assert.equal(params.get('mode'), 'setup');
      assert.equal(params.get('metadata[deferred_billing]'), 'true');
      assert.equal(Number(params.get('metadata[charge_not_before]')), JAN_2);
      assert.equal(params.get('metadata[installments_total]'), count);
      assert.equal(params.get('metadata[scheduled_amount]'), amount);
      assert.equal(params.get('metadata[quarter]'), 'Winter 2027');
      assert.match(params.get('custom_text[submit][message]'), /January 2, 2027/);
    }
  });

  test(`${classId} charges immediately when enrolling on or after January 2`, () => {
    const { selectedClass } = _test.validateSelection({ classId, paymentType: 'full',
      familyMemberCount: 1, bookQuantity: 0 });
    const params = _test.buildCheckoutParams({ selectedClass, paymentType: 'full',
      origin: 'https://www.italianschoolsd.com', now: JAN_2 + 3600 });
    assert.equal(params.get('mode'), 'payment');
    assert.equal(params.get('line_items[0][price_data][unit_amount]'), '38000');
  });
}
