const assert = require('node:assert/strict');
const test = require('node:test');
const session = require('../../site/data/adult_january_may_2027.json');
const { CLASSES } = require('../../netlify/lib/checkout/catalog');
const { _test } = require('../../netlify/functions/create-checkout-session');

const expectedCounts = [15, 15, 15, 18, 18, 18, 18, 18, 17, 17, 18, 18, 18];
const expectedTotals = [55500, 51000, 55500, 61200, 66600, 61200, 66600, 66600, 62900, 62900, 66600, 61200, 66600];
const expectedGroups = ['advanced', 'intermediate', 'intermediate', 'intermediate', 'intermediate',
  'intermediate', 'intermediate', 'advanced', 'intermediate', 'beginner', 'intermediate', 'beginner', 'beginner'];
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const exclusions = new Set(['2027-01-18', '2027-02-12', '2027-02-15', '2027-03-08',
  '2027-03-29', '2027-03-30', '2027-03-31', '2027-04-01', '2027-04-02', '2027-04-03']);

test('all 13 sections match the agreed dates, weekdays, holidays and final week', () => {
  assert.equal(session.classes.length, 13);
  assert.equal(session.classes.reduce((n, c) => n + c.dates.length, 0), 223);
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

test('all three beginner formats offer full and monthly enrollment with complete schedules', () => {
  const beginners = session.classes.filter((section) => section.level === 'Beginner');
  assert.equal(beginners.length, 3);
  assert.deepEqual(beginners.map((section) => section.location).sort(), ['Encinitas', 'Kearny Mesa', 'Online via Zoom']);
  const encinitas = session.classes.filter((section) => section.location === 'Encinitas');
  assert.deepEqual(encinitas.map((section) => [section.teacher, section.level]),
    [['Laura', 'Beginner-Intermediate'], ['Daniela', 'Beginner']]);
  for (const section of beginners) {
    assert.ok(section.day && section.startTime && section.endTime && section.dates.length);
    for (const paymentType of ['full', 'monthly']) {
      const selection = _test.validateSelection({ classId: section.id, paymentType,
        familyMemberCount: 1, bookQuantity: 0, monthlyCommitmentAccepted: true });
      assert.equal(selection.error, undefined);
      const params = _test.buildCheckoutParams({ selectedClass: selection.selectedClass, paymentType,
        origin: 'https://www.italianschoolsd.com', monthlyCommitmentAccepted: true,
        now: Date.parse('2027-01-01T12:00:00-08:00') / 1000 });
      assert.equal(params.get('mode'), 'setup');
      assert.equal(Number(params.get('metadata[scheduled_amount]')),
        paymentType === 'full' ? selection.selectedClass.fullAmount : selection.selectedClass.monthlyAmount);
      assert.equal(params.get('metadata[installments_total]'), paymentType === 'full' ? '1' : '5');
    }
  }
});

test('online classes share one Zoom room with at least 15 minutes between lessons', () => {
  const byDate = new Map();
  function minutes(value) {
    assert.match(value, /^(?:[01]\d|2[0-3]):[0-5]\d$/);
    const [hours, mins] = value.split(':').map(Number);
    return hours * 60 + mins;
  }
  for (const section of session.classes.filter((entry) => entry.format === 'Online')) {
    const start = minutes(section.startTime);
    const end = minutes(section.endTime);
    assert.equal(end - start, 90, section.id);
    for (const date of section.dates) {
      if (!byDate.has(date)) byDate.set(date, []);
      byDate.get(date).push({ id: section.id, start, end });
    }
  }
  assert.ok(byDate.size > 0);
  for (const [date, lessons] of byDate) {
    lessons.sort((a, b) => a.start - b.start);
    for (let i = 1; i < lessons.length; i += 1) {
      const previous = lessons[i - 1];
      const current = lessons[i];
      assert.ok(current.start >= previous.end + 15,
        `${date}: ${previous.id} and ${current.id} need a 15-minute Zoom handover`);
    }
  }
});

test('full and monthly checkout charge the published rates and identify the new term', () => {
  session.classes.forEach((section, i) => {
    const entry = CLASSES[section.id];
    const expectedPath = `/news/2026/11/adult-${expectedGroups[i]}-classes-january-may-2027/`;
    assert.equal(entry.pagePath, expectedPath);
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
      assert.equal(params.get('cancel_url'), `https://www.italianschoolsd.com${expectedPath}#${section.anchor}`);
      assert.equal(params.get('success_url'), `https://www.italianschoolsd.com${expectedPath}?checkout=success#${section.anchor}`);
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
