const assert = require('node:assert/strict');
const test = require('node:test');
const session = require('../../site/data/adult_january_may_2027.json');
const { CLASSES } = require('../../netlify/lib/checkout/catalog');
const { _test } = require('../../netlify/functions/create-checkout-session');

const expectedCounts = [15, 15, 15, 18, 18, 18, 18, 18, 17, 17, 18];
const expectedTotals = [55500, 51000, 55500, 61200, 66600, 61200, 66600, 66600, 62900, 62900, 66600];
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const exclusions = new Set(['2027-01-18', '2027-02-12', '2027-02-15', '2027-03-08',
  '2027-03-29', '2027-03-30', '2027-03-31', '2027-04-01', '2027-04-02', '2027-04-03']);

test('all 11 scheduled sections match the agreed dates, weekdays, holidays and final week', () => {
  assert.equal(session.classes.length, 11);
  assert.equal(session.classes.reduce((n, c) => n + c.dates.length, 0), 187);
  session.classes.forEach((section, i) => {
    assert.equal(section.dates.length, expectedCounts[i]);
    assert.equal(new Set(section.dates).size, section.dates.length);
    for (const date of section.dates) {
      assert.ok(date >= '2027-01-11' && date <= '2027-05-22');
      assert.equal(weekdays[new Date(`${date}T12:00:00Z`).getUTCDay()], section.day);
      assert.equal(exclusions.has(date), false);
    }
    assert.ok(section.dates.at(-1) >= '2027-05-17');
  });
});

test('beginner offerings cover online, Kearny Mesa and Encinitas without billing unscheduled sections', () => {
  const encinitas = session.classes.filter((section) => section.location === 'Encinitas');
  assert.equal(encinitas.length, 2);
  assert.deepEqual(encinitas.map((section) => [section.teacher, section.level]),
    [['Laura', 'Beginner-Intermediate'], ['Daniela', 'Beginner']]);
  const beginner = encinitas.find((section) => section.level === 'Beginner');
  assert.equal(CLASSES[beginner.id].level, 'Beginner');
  assert.match(CLASSES[beginner.id].name, /Class - Beginner Friday/);
  assert.equal(CLASSES[beginner.id].fullAmount, 62900);
  assert.deepEqual(session.plannedClasses.map((section) => [section.level, section.location]),
    [['Beginner', 'Online via Zoom'], ['Beginner', 'Kearny Mesa']]);
  for (const section of session.plannedClasses) {
    for (const paymentType of ['full', 'monthly']) {
      const selection = _test.validateSelection({ classId: section.id, paymentType,
        familyMemberCount: 1, bookQuantity: 0, monthlyCommitmentAccepted: true });
      assert.equal(selection.error.statusCode, 400);
    }
  }
});

test('full and monthly checkout charge the published rates and identify the new term', () => {
  session.classes.forEach((section, i) => {
    const entry = CLASSES[section.id];
    assert.equal(entry.fullAmount, expectedTotals[i]);
    assert.equal(entry.monthlyInstallments, 5);
    assert.equal(entry.monthlyAmount * 5, Math.round(entry.fullAmount * 110 / 100));
    for (const paymentType of ['full', 'monthly']) {
      const selection = _test.validateSelection({ classId: section.id, paymentType,
        familyMemberCount: 1, bookQuantity: 0, monthlyCommitmentAccepted: true });
      assert.equal(selection.error, undefined);
      const params = _test.buildCheckoutParams({ selectedClass: entry, paymentType,
        origin: 'https://www.italianschoolsd.com', monthlyCommitmentAccepted: true,
        now: Date.parse('2027-01-02T00:00:00-08:00') / 1000 });
      assert.equal(Number(params.get('line_items[0][price_data][unit_amount]')),
        paymentType === 'full' ? expectedTotals[i] : entry.monthlyAmount);
      assert.equal(params.get('line_items[0][price_data][product_data][metadata][quarter]'), 'January-May 2027');
      assert.equal(params.get('cancel_url'), `https://www.italianschoolsd.com${session.pagePath}#${section.anchor}`);
      assert.equal(params.get('metadata[class_id]'), section.id);
      if (paymentType === 'monthly') assert.equal(params.get('metadata[installments_total]'), '5');
    }
  });
});

test('legacy checkout retains its Fall 2026 term', () => {
  const params = _test.buildCheckoutParams({ selectedClass: CLASSES['fall-2026-mon-int'],
    paymentType: 'full', origin: 'https://www.italianschoolsd.com' });
  assert.equal(params.get('line_items[0][price_data][product_data][metadata][quarter]'), 'Fall 2026');
});
