const assert = require('node:assert/strict');
const test = require('node:test');

const { handler, _test } = require('../../netlify/functions/send-encinitas-details');

test('normalizes and validates email addresses', () => {
  assert.equal(_test.normalizeEmail('  Person@Example.COM '), 'person@example.com');
  assert.equal(_test.isValidEmail('person@example.com'), true);
  assert.equal(_test.isValidEmail('not-an-email'), false);
});

test('builds the reminder from the shared Encinitas class data', () => {
  const message = _test.buildMessage();
  assert.match(message.text, /September 14, 2026/);
  assert.match(message.text, /September 18, 2026/);
  assert.match(message.text, /encinitas-info/);
  assert.match(message.html, /Italian classes in Encinitas/);
});

test('rejects an invalid email without calling Resend', async (t) => {
  process.env.RESEND_API_KEY = 'test-key';
  const fetchMock = t.mock.method(global, 'fetch', async () => {
    throw new Error('fetch should not be called');
  });

  const response = await handler({ httpMethod: 'POST', body: JSON.stringify({ email: 'bad' }) });
  assert.equal(response.statusCode, 400);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test('honeypot submissions return success without sending', async (t) => {
  process.env.RESEND_API_KEY = 'test-key';
  const fetchMock = t.mock.method(global, 'fetch', async () => {
    throw new Error('fetch should not be called');
  });

  const response = await handler({
    httpMethod: 'POST',
    body: JSON.stringify({ email: 'bot@example.com', website: 'https://spam.example' }),
  });
  assert.equal(response.statusCode, 200);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test('sends one confirmation email and blind-copies the school', async (t) => {
  process.env.RESEND_API_KEY = 'test-key';
  const fetchMock = t.mock.method(global, 'fetch', async () => ({
    ok: true,
    status: 200,
    text: async () => '',
  }));

  const response = await handler({
    httpMethod: 'POST',
    body: JSON.stringify({ email: ' Person@Example.com ' }),
  });

  assert.equal(response.statusCode, 200);
  assert.equal(fetchMock.mock.callCount(), 1);
  const [url, request] = fetchMock.mock.calls[0].arguments;
  const payload = JSON.parse(request.body);
  assert.equal(url, 'https://api.resend.com/emails');
  assert.equal(payload.to, 'person@example.com');
  assert.equal(payload.bcc, 'andrea.zonca@gmail.com');
  assert.equal(payload.reply_to, 'info@italianschoolsd.com');
  assert.match(payload.text, /Italian classes for kids/);
  assert.match(payload.html, /Italian classes for adults/);
});
