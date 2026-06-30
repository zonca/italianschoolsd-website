const { URL, URLSearchParams } = require('url');
const { BOOKS, CLASSES } = require('../lib/checkout/catalog');
const { sendErrorAlert } = require('../lib/checkout/alerts');

const STRIPE_API_VERSION = '2026-02-25.clover';
const CLASS_TAX_CODE = 'txcd_00000000';
const BOOK_TAX_CODE = 'txcd_99999999';

function baseUrl(event) {
  const host = event.headers.host || event.headers.Host;
  const proto = event.headers['x-forwarded-proto'] || 'https';
  return process.env.URL || process.env.DEPLOY_PRIME_URL || `${proto}://${host}`;
}

function parseBody(event) {
  const raw = event.isBase64Encoded
    ? Buffer.from(event.body || '', 'base64').toString('utf8')
    : (event.body || '');
  return new URLSearchParams(raw);
}

function validateSelection({ classId, paymentType }) {
  const selectedClass = CLASSES[classId];

  if (!selectedClass) {
    return { error: { statusCode: 400, body: 'Unknown class selection.' } };
  }
  if (!['full', 'monthly'].includes(paymentType)) {
    return { error: { statusCode: 400, body: 'Unknown payment selection.' } };
  }

  return { selectedClass };
}

function appendInlineLineItem(params, index, item) {
  params.append(`line_items[${index}][quantity]`, String(item.quantity || 1));
  params.append(`line_items[${index}][price_data][currency]`, 'usd');
  params.append(`line_items[${index}][price_data][unit_amount]`, String(item.amount));
  params.append(`line_items[${index}][price_data][product_data][name]`, item.name);
  params.append(`line_items[${index}][price_data][product_data][tax_code]`, item.taxCode);
  (item.images || []).forEach((image, imageIndex) => {
    params.append(`line_items[${index}][price_data][product_data][images][${imageIndex}]`, image);
  });
  Object.entries(item.metadata || {}).forEach(([key, value]) => {
    params.append(`line_items[${index}][price_data][product_data][metadata][${key}]`, String(value));
  });
  if (item.recurring) {
    params.append(`line_items[${index}][price_data][recurring][interval]`, 'month');
  }
}

function appendOptionalItem(params, index, item) {
  params.append(`optional_items[${index}][price]`, item.price);
  params.append(`optional_items[${index}][quantity]`, String(item.quantity || 1));
  if (item.adjustableQuantity) {
    params.append(`optional_items[${index}][adjustable_quantity][enabled]`, 'true');
    params.append(`optional_items[${index}][adjustable_quantity][minimum]`, String(item.adjustableQuantity.minimum));
    params.append(`optional_items[${index}][adjustable_quantity][maximum]`, String(item.adjustableQuantity.maximum));
  }
}

async function stripeRequest(path, params, method = 'POST') {
  const url = new URL(`https://api.stripe.com/v1${path}`);
  const request = {
    method,
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      'Stripe-Version': STRIPE_API_VERSION,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  if (method === 'GET') {
    params.forEach((value, key) => url.searchParams.append(key, value));
  } else {
    request.body = params;
  }
  const response = await fetch(url, request);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Stripe ${path} failed: ${data.error?.message || JSON.stringify(data)}`);
  }
  return data;
}

async function findActivePriceByLookupKey(lookupKey) {
  const params = new URLSearchParams();
  params.append('lookup_keys[]', lookupKey);
  params.append('active', 'true');
  params.append('limit', '1');
  const result = await stripeRequest('/prices', params, 'GET');
  return result.data?.[0]?.id || null;
}

async function getOrCreateAdditionalFamilyMemberPrice(selectedClass) {
  const additionalAmount = Math.round(selectedClass.fullAmount * 0.9);
  const lookupKey = `fall_2026_additional_member_${selectedClass.id}_${additionalAmount}_v1`;
  const existing = await findActivePriceByLookupKey(lookupKey);
  if (existing) {
    return existing;
  }

  const params = new URLSearchParams();
  params.append('currency', 'usd');
  params.append('lookup_key', lookupKey);
  params.append('unit_amount', String(additionalAmount));
  params.append('product_data[name]', `${selectedClass.name} - Additional family member`);
  params.append('product_data[tax_code]', CLASS_TAX_CODE);
  params.append('product_data[unit_label]', 'member');
  params.append('metadata[class_id]', selectedClass.id);
  params.append('metadata[family_discount]', '10_percent');
  const price = await stripeRequest('/prices', params);
  return price.id;
}

async function getOrCreateBookPrice(book) {
  const lookupKey = `book_${book.id}_${book.amount}_v1`;
  const existing = await findActivePriceByLookupKey(lookupKey);
  if (existing) {
    return existing;
  }

  const params = new URLSearchParams();
  params.append('currency', 'usd');
  params.append('lookup_key', lookupKey);
  params.append('unit_amount', String(book.amount));
  params.append('product_data[name]', book.name);
  params.append('product_data[tax_code]', BOOK_TAX_CODE);
  params.append('metadata[item_type]', 'book');
  params.append('metadata[book_id]', book.id);
  const price = await stripeRequest('/prices', params);
  return price.id;
}

async function resolveCheckoutPrices({ selectedClass, paymentType }) {
  const bookPriceId = selectedClass.bookId
    ? await getOrCreateBookPrice(BOOKS[selectedClass.bookId])
    : null;
  const additionalFamilyMemberPriceId = paymentType === 'full'
    ? await getOrCreateAdditionalFamilyMemberPrice(selectedClass)
    : null;

  return { bookPriceId, additionalFamilyMemberPriceId };
}

function buildCheckoutParams({ selectedClass, paymentType, origin, additionalFamilyMemberPriceId, bookPriceId }) {
  const returnPath = `${selectedClass.pagePath}?checkout=success#${selectedClass.anchor}`;
  const cancelPath = `${selectedClass.pagePath}#${selectedClass.anchor}`;
  const mode = paymentType === 'monthly' ? 'subscription' : 'payment';
  const params = new URLSearchParams();
  const metadata = {
    class_id: selectedClass.id,
    class_level: selectedClass.level,
    class_format: selectedClass.format,
    quarter: 'Fall 2026',
    payment_type: paymentType,
    book_choice: bookPriceId ? 'optional_in_checkout' : 'none',
    quantity_choice: paymentType === 'full' ? 'additional_family_members_optional_in_checkout' : 'one_student',
  };

  params.append('mode', mode);
  params.append('success_url', `${origin}${returnPath}`);
  params.append('cancel_url', `${origin}${cancelPath}`);
  params.append('client_reference_id', selectedClass.id);
  params.append('metadata[class_id]', selectedClass.id);
  params.append('metadata[payment_type]', paymentType);
  params.append('metadata[book_choice]', metadata.book_choice);
  params.append('metadata[quantity_choice]', metadata.quantity_choice);

  let lineIndex = 0;
  let optionalIndex = 0;
  if (paymentType === 'full') {
    appendInlineLineItem(params, lineIndex, {
      name: `${selectedClass.name} - First family member`,
      amount: selectedClass.fullAmount,
      taxCode: CLASS_TAX_CODE,
      metadata,
    });
    lineIndex += 1;
  } else {
    appendInlineLineItem(params, lineIndex, {
      name: selectedClass.name,
      amount: selectedClass.monthlyAmount,
      recurring: true,
      taxCode: CLASS_TAX_CODE,
      metadata,
    });
    lineIndex += 1;
  }

  if (bookPriceId) {
    appendOptionalItem(params, optionalIndex, {
      price: bookPriceId,
      adjustableQuantity: {
        minimum: 1,
        maximum: 6,
      },
    });
    optionalIndex += 1;
    params.append('automatic_tax[enabled]', 'true');
    params.append('billing_address_collection', 'required');
  }

  if (paymentType === 'full') {
    if (!additionalFamilyMemberPriceId) {
      throw new Error('Pay-in-full checkout requires a Stripe additional family member price.');
    }
    appendOptionalItem(params, optionalIndex, {
      price: additionalFamilyMemberPriceId,
      adjustableQuantity: {
        minimum: 1,
        maximum: 5,
      },
    });
    optionalIndex += 1;
  }

  if (paymentType === 'full') {
    params.append('customer_creation', 'if_required');
    params.append('payment_intent_data[metadata][class_id]', selectedClass.id);
    params.append('payment_intent_data[metadata][payment_type]', paymentType);
  } else {
    params.append('subscription_data[metadata][class_id]', selectedClass.id);
    params.append('subscription_data[metadata][payment_type]', paymentType);
    params.append('subscription_data[metadata][installments_total]', '5');
    params.append('subscription_data[metadata][cancel_after_months]', '5');
  }

  return params;
}

exports.handler = async function handler(event) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method not allowed' };
    }
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }

    const body = parseBody(event);
    const classId = body.get('classId');
    const paymentType = body.get('paymentType');
    const { selectedClass, error } = validateSelection({ classId, paymentType });

    if (error) {
      return error;
    }

    const origin = baseUrl(event);
    const { bookPriceId, additionalFamilyMemberPriceId } = await resolveCheckoutPrices({
      selectedClass,
      paymentType,
    });
    const params = buildCheckoutParams({
      selectedClass,
      paymentType,
      bookPriceId,
      additionalFamilyMemberPriceId,
      origin,
    });
    const session = await stripeRequest('/checkout/sessions', params);
    return {
      statusCode: 303,
      headers: {
        Location: session.url,
        'Cache-Control': 'no-store',
      },
      body: 'Redirecting to Stripe checkout.',
    };
  } catch (error) {
    console.error(error);
    await sendErrorAlert('Italian School Stripe checkout error', {
      message: error.message,
      stack: error.stack,
      path: event.path,
      requestId: event.headers['x-nf-request-id'],
    });
    return {
      statusCode: 500,
      body: 'Checkout is temporarily unavailable. Please contact us and we will help you enroll.',
    };
  }
};

exports._test = {
  buildCheckoutParams,
  findActivePriceByLookupKey,
  getOrCreateBookPrice,
  getOrCreateAdditionalFamilyMemberPrice,
  validateSelection,
};
