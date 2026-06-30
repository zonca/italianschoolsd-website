const { URLSearchParams } = require('url');
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

function parseStudentCount(value) {
  const count = Number.parseInt(value || '1', 10);
  return Number.isInteger(count) ? count : 1;
}

function validateSelection({ classId, paymentType, includeBook, studentCount }) {
  const selectedClass = CLASSES[classId];

  if (!selectedClass) {
    return { error: { statusCode: 400, body: 'Unknown class selection.' } };
  }
  if (!['full', 'monthly'].includes(paymentType)) {
    return { error: { statusCode: 400, body: 'Unknown payment selection.' } };
  }
  if (includeBook && !selectedClass.bookId) {
    return { error: { statusCode: 400, body: 'Book purchase is not available for this class.' } };
  }
  if (studentCount < 1 || studentCount > 6) {
    return { error: { statusCode: 400, body: 'Student count must be between 1 and 6.' } };
  }
  if (studentCount > 1 && paymentType !== 'full') {
    return { error: { statusCode: 400, body: 'Multiple-student checkout is available only for pay-in-full enrollment.' } };
  }

  return { selectedClass };
}

function appendLineItem(params, index, item) {
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

function buildCheckoutParams({ selectedClass, paymentType, includeBook, origin, studentCount = 1 }) {
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
    includes_book: includeBook ? 'yes' : 'no',
    student_count: String(studentCount),
  };

  params.append('mode', mode);
  params.append('success_url', `${origin}${returnPath}`);
  params.append('cancel_url', `${origin}${cancelPath}`);
  params.append('client_reference_id', selectedClass.id);
  params.append('metadata[class_id]', selectedClass.id);
  params.append('metadata[payment_type]', paymentType);
  params.append('metadata[includes_book]', includeBook ? 'yes' : 'no');
  params.append('metadata[student_count]', String(studentCount));

  let lineIndex = 0;
  if (paymentType === 'full' && studentCount > 1) {
    appendLineItem(params, lineIndex, {
      name: `${selectedClass.name} - First student`,
      amount: selectedClass.fullAmount,
      taxCode: CLASS_TAX_CODE,
      metadata,
    });
    lineIndex += 1;
    appendLineItem(params, lineIndex, {
      name: `${selectedClass.name} - Additional sibling`,
      amount: Math.round(selectedClass.fullAmount * 0.9),
      quantity: studentCount - 1,
      taxCode: CLASS_TAX_CODE,
      metadata: {
        ...metadata,
        family_discount: '10_percent',
      },
    });
    lineIndex += 1;
  } else {
    appendLineItem(params, lineIndex, {
      name: selectedClass.name,
      amount: paymentType === 'monthly' ? selectedClass.monthlyAmount : selectedClass.fullAmount,
      recurring: paymentType === 'monthly',
      taxCode: CLASS_TAX_CODE,
      metadata,
    });
    lineIndex += 1;
  }

  if (includeBook) {
    const book = BOOKS[selectedClass.bookId];
    appendLineItem(params, lineIndex, {
      name: book.name,
      amount: book.amount,
      quantity: studentCount,
      images: [`${origin}${book.imagePath}`],
      taxCode: BOOK_TAX_CODE,
      metadata: {
        item_type: 'book',
        book_id: book.id,
        paired_class_id: selectedClass.id,
      },
    });
    params.append('automatic_tax[enabled]', 'true');
    params.append('billing_address_collection', 'required');
  }

  if (paymentType === 'full') {
    params.append('customer_creation', 'if_required');
    params.append('payment_intent_data[metadata][class_id]', selectedClass.id);
    params.append('payment_intent_data[metadata][payment_type]', paymentType);
    params.append('payment_intent_data[metadata][student_count]', String(studentCount));
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
    const includeBook = body.get('includeBook') === 'yes';
    const studentCount = parseStudentCount(body.get('studentCount'));
    const { selectedClass, error } = validateSelection({ classId, paymentType, includeBook, studentCount });

    if (error) {
      return error;
    }

    const params = buildCheckoutParams({
      selectedClass,
      paymentType,
      includeBook,
      studentCount,
      origin: baseUrl(event),
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
  parseStudentCount,
  validateSelection,
};
