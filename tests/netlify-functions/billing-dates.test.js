const assert = require('node:assert/strict');
const test = require('node:test');
const { addMonths } = require('../../netlify/lib/checkout/billing-dates');

test('month-end billing clamps short months without skipping February or drifting the anchor', () => {
  const start = Date.parse('2027-01-31T20:15:00Z') / 1000;
  assert.deepEqual([0, 1, 2, 3, 4, 5].map((month) => new Date(addMonths(start, month) * 1000).toISOString()), [
    '2027-01-31T20:15:00.000Z', '2027-02-28T20:15:00.000Z', '2027-03-31T20:15:00.000Z',
    '2027-04-30T20:15:00.000Z', '2027-05-31T20:15:00.000Z', '2027-06-30T20:15:00.000Z',
  ]);
});

test('billing dates preserve leap days and the January 2 payment schedule', () => {
  const leap = Date.parse('2028-01-31T08:00:00Z') / 1000;
  assert.equal(new Date(addMonths(leap, 1) * 1000).toISOString(), '2028-02-29T08:00:00.000Z');
  const early = Date.parse('2027-01-02T08:00:00Z') / 1000;
  assert.deepEqual([0, 1, 2, 3, 4].map((month) => new Date(addMonths(early, month) * 1000).toISOString().slice(0, 10)),
    ['2027-01-02', '2027-02-02', '2027-03-02', '2027-04-02', '2027-05-02']);
});
