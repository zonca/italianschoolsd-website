const { URLSearchParams } = require('url');
const { BOOKS, CLASSES } = require('../lib/checkout/catalog');
const { sendErrorAlert } = require('../lib/checkout/alerts');
const { chargeStart, quoteAmount } = require('../lib/checkout/deferred-billing');
const { quoteBook } = require('../lib/checkout/book-tax');

const STRIPE_API_VERSION = '2026-02-25.clover';
const CLASS_TAX_CODE = 'txcd_00000000';
const BOOK_TAX_CODE = 'txcd_99999999';

function baseUrl(event) {
  const host = event.headers.host || event.headers.Host;
  const proto = event.headers['x-forwarded-proto'] || 'https';
  // Netlify exposes SITE_NAME and URL at function runtime, but not the
  // build-only deploy context variables. Trust only this site's preview hosts.
  if (process.env.SITE_NAME && host) {
    const suffix = `--${process.env.SITE_NAME}.netlify.app`;
    if (host.endsWith(suffix) && /^[a-z0-9-]+$/.test(host.slice(0, -suffix.length))) {
      return `https://${host}`;
    }
  }
  return process.env.URL || process.env.DEPLOY_PRIME_URL || `${proto}://${host}`;
}

function parseBody(event) {
  const raw = event.isBase64Encoded
    ? Buffer.from(event.body || '', 'base64').toString('utf8')
    : (event.body || '');
  return new URLSearchParams(raw);
}

function parseCount(value, fallback = 0) {
  const count = Number.parseInt(value ?? String(fallback), 10);
  return Number.isInteger(count) ? count : fallback;
}

function validateSelection({
  classId,
  paymentType,
  familyMemberCount,
  bookQuantity,
  monthlyCommitmentAccepted = false,
}) {
  const selectedClass = CLASSES[classId];

  if (!selectedClass) {
    return { error: { statusCode: 400, body: 'Unknown class selection.' } };
  }
  if (!['full', 'monthly'].includes(paymentType)) {
    return { error: { statusCode: 400, body: 'Unknown payment selection.' } };
  }
  if (paymentType === 'monthly' && !selectedClass.monthlyAmount) {
    return { error: { statusCode: 400, body: 'Monthly payment is not available for this class.' } };
  }
  if (familyMemberCount < 1 || familyMemberCount > 6) {
    return { error: { statusCode: 400, body: 'Family member count must be between 1 and 6.' } };
  }
  if (paymentType === 'monthly' && familyMemberCount !== 1) {
    return { error: { statusCode: 400, body: 'Monthly checkout is for one student at a time.' } };
  }
  if (paymentType === 'monthly' && !monthlyCommitmentAccepted) {
    return { error: { statusCode: 400, body: 'Monthly payment commitment must be accepted.' } };
  }
  if (bookQuantity < 0 || bookQuantity > 6) {
    return { error: { statusCode: 400, body: 'Book quantity must be between 0 and 6.' } };
  }
  if (paymentType === 'monthly' && bookQuantity > 1) {
    return { error: { statusCode: 400, body: 'Monthly checkout allows at most 1 book.' } };
  }
  if (bookQuantity > 0 && !selectedClass.bookId) {
    return { error: { statusCode: 400, body: 'Book purchase is not available for this class.' } };
  }

  return { selectedClass };
}

function appendInlineLineItem(params, index, item) {
  params.append(`line_items[${index}][quantity]`, String(item.quantity || 1));
  params.append(`line_items[${index}][price_data][currency]`, 'usd');
  params.append(`line_items[${index}][price_data][unit_amount]`, String(item.amount));
  params.append(`line_items[${index}][price_data][product_data][name]`, item.name);
  params.append(`line_items[${index}][price_data][product_data][tax_code]`, item.taxCode);
  if (item.taxBehavior) params.append(`line_items[${index}][price_data][tax_behavior]`, item.taxBehavior);
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

function buildCheckoutParams({
  selectedClass,
  paymentType,
  origin,
  familyMemberCount = 1,
  bookQuantity = 0,
  bookQuote,
  monthlyCommitmentAccepted = false,
  now = Math.floor(Date.now() / 1000),
}) {
  const returnPath = `${selectedClass.pagePath}?checkout=success#${selectedClass.anchor}`;
  const cancelPath = `${selectedClass.pagePath}#${selectedClass.anchor}`;
  const mode = paymentType === 'monthly' ? 'subscription' : 'payment';
  const monthlyInstallments = selectedClass.monthlyInstallments || 5;
  const params = new URLSearchParams();
  const metadata = {
    class_id: selectedClass.id,
    class_level: selectedClass.level,
    class_format: selectedClass.format,
    quarter: selectedClass.term || 'Fall 2026',
    payment_type: paymentType,
    family_member_count: String(familyMemberCount),
    book_quantity: String(bookQuantity),
    monthly_commitment_accepted: paymentType === 'monthly' && monthlyCommitmentAccepted ? 'true' : 'not_applicable',
  };

  params.append('mode', mode);
  params.append('success_url', `${origin}${returnPath}`);
  params.append('cancel_url', `${origin}${cancelPath}`);
  params.append('client_reference_id', selectedClass.id);
  params.append('metadata[class_id]', selectedClass.id);
  params.append('metadata[payment_type]', paymentType);
  params.append('metadata[family_member_count]', String(familyMemberCount));
  params.append('metadata[book_quantity]', String(bookQuantity));
  params.append('metadata[monthly_commitment_accepted]', metadata.monthly_commitment_accepted);

  const deferredStart = chargeStart(selectedClass);
  const chargeLater = deferredStart > now;
  // Book combos use the saved-card invoice flow even after the cutoff, so
  // classroom-pickup tax is charged correctly with the first payment only.
  if (chargeLater || (bookQuantity > 0 && deferredStart > 0)) {
    const billingStart = Math.max(deferredStart, now);
    const amount = quoteAmount(selectedClass, paymentType, familyMemberCount);
    if (bookQuantity > 0) {
      const book = BOOKS[selectedClass.bookId];
      if (!bookQuote || bookQuote.subtotal !== book?.amount * bookQuantity
          || !Number.isSafeInteger(bookQuote.tax) || bookQuote.tax <= 0
          || bookQuote.total !== bookQuote.subtotal + bookQuote.tax || !bookQuote.calculationId) {
        throw new Error('A verified book tax quote is required before saving the card');
      }
      params.set('billing_address_collection', 'required');
      for (const [key, value] of Object.entries({ book_id: book.id, book_subtotal: bookQuote.subtotal,
        book_tax: bookQuote.tax, book_total: bookQuote.total, book_tax_calculation: bookQuote.calculationId })) {
        params.set(`metadata[${key}]`, String(value));
      }
    }
    const count = paymentType === 'monthly' ? monthlyInstallments : 1;
    params.set('mode', 'setup');
    params.set('currency', 'usd');
    params.set('customer_creation', 'always');
    params.set('payment_method_types[0]', 'card');
    // Checkout setup mode creates an off-session SetupIntent by default.
    params.set('metadata[deferred_billing]', 'true');
    params.set('metadata[charge_not_before]', String(billingStart));
    params.set('metadata[scheduled_amount]', String(amount));
    params.set('metadata[installments_total]', String(count));
    params.set('metadata[enrollment_name]', selectedClass.name);
    params.set('metadata[quarter]', selectedClass.term);
    const date = new Date(billingStart * 1000).toLocaleDateString('en-US', {
      timeZone: 'America/Los_Angeles', year: 'numeric', month: 'long', day: 'numeric',
    });
    const total = (amount / 100).toFixed(2);
    let terms = paymentType === 'monthly'
      ? `Save your card for ${count} monthly payments of $${total}. The first payment is on ${date} (Pacific Time), then on the 2nd of each month.`
      : `Save your card for one full-session payment of $${total} on ${date} (Pacific Time).`;
    if (bookQuantity > 0) {
      const first = ((amount + bookQuote.total) / 100).toFixed(2);
      const bookTotal = (bookQuote.total / 100).toFixed(2);
      const timing = chargeLater ? `on ${date} (Pacific Time)` : 'immediately after you save your card';
      terms = paymentType === 'monthly'
        ? `Save your card: $${first} ${timing}, including $${bookTotal} for books and sales tax, `
          + `then ${count - 1} monthly payments of $${total} ${chargeLater ? 'on the 2nd' : 'from your enrollment date'}.`
        : `Save your card for one payment of $${first} ${timing}, including $${bookTotal} for books and sales tax.`;
    }
    params.set('custom_text[submit][message]', chargeLater
      ? `${terms} No tuition is charged when you save your card. If enrollment is completed after that date, the first payment is charged immediately.`
      : terms);
    return params;
  }

  let lineIndex = 0;
  if (paymentType === 'full') {
    appendInlineLineItem(params, lineIndex, {
      name: `${selectedClass.name} - Student`,
      amount: selectedClass.fullAmount,
      taxCode: CLASS_TAX_CODE,
      metadata,
    });
    lineIndex += 1;
    if (familyMemberCount > 1) {
      appendInlineLineItem(params, lineIndex, {
        name: `${selectedClass.name} - Additional student from same family`,
        amount: Math.round(selectedClass.fullAmount * 0.9),
        quantity: familyMemberCount - 1,
        taxCode: CLASS_TAX_CODE,
        metadata: {
          ...metadata,
          family_discount: '10_percent',
        },
      });
      lineIndex += 1;
    }
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

  if (bookQuantity > 0) {
    const book = BOOKS[selectedClass.bookId];
    appendInlineLineItem(params, lineIndex, {
      name: book.name,
      amount: book.amount,
      quantity: bookQuantity,
      images: [`${origin}${book.imagePath}`],
      taxCode: BOOK_TAX_CODE,
      taxBehavior: 'exclusive',
      metadata: {
        item_type: 'book',
        book_id: book.id,
        paired_class_id: selectedClass.id,
      },
    });
    params.append('automatic_tax[enabled]', 'true');
    params.append('billing_address_collection', 'required');
    lineIndex += 1;
  }

  if (paymentType === 'full') {
    params.append('customer_creation', 'if_required');
    params.append('payment_intent_data[metadata][class_id]', selectedClass.id);
    params.append('payment_intent_data[metadata][payment_type]', paymentType);
    params.append('payment_intent_data[metadata][family_member_count]', String(familyMemberCount));
    params.append('payment_intent_data[metadata][book_quantity]', String(bookQuantity));
  } else {
    params.append('metadata[installments_total]', String(monthlyInstallments));
    params.append('metadata[cancel_after_months]', String(monthlyInstallments));
    params.append('subscription_data[metadata][class_id]', selectedClass.id);
    params.append('subscription_data[metadata][payment_type]', paymentType);
    params.append('subscription_data[metadata][installments_total]', String(monthlyInstallments));
    params.append('subscription_data[metadata][cancel_after_months]', String(monthlyInstallments));
    params.append('subscription_data[metadata][monthly_commitment_accepted]', metadata.monthly_commitment_accepted);
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
    const familyMemberCount = paymentType === 'monthly' ? 1 : parseCount(body.get('familyMemberCount'), 1);
    const bookQuantity = parseCount(body.get('bookQuantity'), 0);
    const monthlyCommitmentAccepted = body.get('monthlyCommitmentAccepted') === 'on';
    const { selectedClass, error } = validateSelection({
      classId,
      paymentType,
      familyMemberCount,
      bookQuantity,
      monthlyCommitmentAccepted,
    });

    if (error) {
      return error;
    }

    const origin = baseUrl(event);
    const now = Math.floor(Date.now() / 1000);
    const bookQuote = bookQuantity > 0 && chargeStart(selectedClass) > 0
      ? await quoteBook(selectedClass, bookQuantity, stripeRequest) : undefined;
    const params = buildCheckoutParams({
      selectedClass,
      paymentType,
      familyMemberCount,
      bookQuantity,
      bookQuote,
      monthlyCommitmentAccepted,
      origin,
      now,
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
  baseUrl,
  buildCheckoutParams,
  parseCount,
  validateSelection,
};
