const crypto = require('crypto');
const { sendErrorAlert } = require('../lib/checkout/alerts');

const TOLERANCE_SECONDS = 300;
const STRIPE_API_VERSION = '2026-02-25.clover';

function addMonths(timestampSeconds, months) {
  const date = new Date(timestampSeconds * 1000);
  date.setUTCMonth(date.getUTCMonth() + months);
  return Math.floor(date.getTime() / 1000);
}

function rawBody(event) {
  return event.isBase64Encoded
    ? Buffer.from(event.body || '', 'base64').toString('utf8')
    : (event.body || '');
}

function verifyStripeSignature(payload, signatureHeader, secret) {
  if (!signatureHeader) {
    throw new Error('Missing Stripe-Signature header');
  }

  const values = Object.fromEntries(
    signatureHeader.split(',').map((part) => {
      const [key, value] = part.split('=');
      return [key, value];
    })
  );
  const timestamp = Number(values.t);
  const signature = values.v1;

  if (!timestamp || !signature) {
    throw new Error('Invalid Stripe-Signature header');
  }
  if (Math.abs(Math.floor(Date.now() / 1000) - timestamp) > TOLERANCE_SECONDS) {
    throw new Error('Expired Stripe webhook signature');
  }

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${payload}`, 'utf8')
    .digest('hex');
  const expectedBuffer = Buffer.from(expected, 'hex');
  const actualBuffer = Buffer.from(signature, 'hex');
  if (expectedBuffer.length !== actualBuffer.length || !crypto.timingSafeEqual(expectedBuffer, actualBuffer)) {
    throw new Error('Invalid Stripe webhook signature');
  }
}

async function handleEvent(event) {
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    if (session.mode === 'subscription' && session.metadata?.payment_type === 'monthly' && !session.subscription) {
      throw new Error(`Completed monthly Checkout Session has no subscription: ${session.id}`);
    }
    if (session.mode === 'subscription' && session.metadata?.payment_type === 'monthly') {
      const cancelAt = addMonths(session.created, 5);
      const params = new URLSearchParams();
      params.append('cancel_at', String(cancelAt));
      params.append('metadata[installments_total]', '5');
      params.append('metadata[cancel_after_months]', '5');
      await stripeRequest(`/subscriptions/${session.subscription}`, params);
    }
  }
}

async function stripeRequest(path, params) {
  const response = await fetch(`https://api.stripe.com/v1${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      'Stripe-Version': STRIPE_API_VERSION,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Stripe ${path} failed: ${data.error?.message || JSON.stringify(data)}`);
  }
  return data;
}

exports.handler = async function handler(event) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method not allowed' };
    }
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
    }
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }

    const payload = rawBody(event);
    verifyStripeSignature(payload, event.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
    await handleEvent(JSON.parse(payload));

    return { statusCode: 200, body: JSON.stringify({ received: true }) };
  } catch (error) {
    console.error(error);
    await sendErrorAlert('Italian School Stripe webhook error', {
      message: error.message,
      stack: error.stack,
      requestId: event.headers['x-nf-request-id'],
    });
    return { statusCode: 400, body: 'Webhook error' };
  }
};

exports._test = {
  addMonths,
  handleEvent,
  verifyStripeSignature,
};
