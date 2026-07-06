const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const test = require('node:test');

const { _test } = require('../../netlify/functions/stripe-webhook');

function signedHeader(payload, secret, timestamp = Math.floor(Date.now() / 1000)) {
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${payload}`)
    .digest('hex');
  return `t=${timestamp},v1=${signature}`;
}

test('verifyStripeSignature accepts a valid signed payload', () => {
  const payload = JSON.stringify({ id: 'evt_test' });
  assert.doesNotThrow(() => {
    _test.verifyStripeSignature(payload, signedHeader(payload, 'whsec_test'), 'whsec_test');
  });
});

test('verifyStripeSignature rejects invalid and expired signatures', () => {
  const payload = JSON.stringify({ id: 'evt_test' });
  assert.throws(
    () => _test.verifyStripeSignature(payload, signedHeader(payload, 'wrong'), 'whsec_test'),
    /Invalid Stripe webhook signature/
  );
  assert.throws(
    () => _test.verifyStripeSignature(payload, signedHeader(payload, 'whsec_test', 1), 'whsec_test'),
    /Expired Stripe webhook signature/
  );
});

test('handleEvent updates monthly subscription cancel_at for five months later', async () => {
  const calls = [];
  const originalFetch = global.fetch;
  process.env.STRIPE_SECRET_KEY = 'sk_test_unit';
  global.fetch = async (url, options) => {
    calls.push({ url, options });
    return {
      ok: true,
      async json() {
        return { id: 'sub_test' };
      },
    };
  };

  try {
    await _test.handleEvent({
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test',
          mode: 'subscription',
          subscription: 'sub_test',
          created: 1782766000,
          metadata: { payment_type: 'monthly' },
        },
      },
    });
  } finally {
    global.fetch = originalFetch;
    delete process.env.STRIPE_SECRET_KEY;
  }

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://api.stripe.com/v1/subscriptions/sub_test');
  const body = calls[0].options.body;
  assert.equal(body.get('metadata[installments_total]'), '5');
  assert.equal(body.get('metadata[cancel_after_months]'), '5');
  assert.match(body.get('cancel_at'), /^[0-9]+$/);
});

test('handleEvent rejects completed monthly sessions without subscription id', async () => {
  await assert.rejects(
    _test.handleEvent({
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_missing_subscription',
          mode: 'subscription',
          created: 1782766000,
          metadata: { payment_type: 'monthly' },
        },
      },
    }),
    /has no subscription/
  );
});
