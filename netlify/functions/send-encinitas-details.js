const details = require('../../site/data/encinitas_fall_2026.json');

const RESEND_URL = 'https://api.resend.com/emails';

function jsonResponse(statusCode, payload) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
    body: JSON.stringify(payload),
  };
}

function normalizeEmail(value) {
  if (typeof value !== 'string') return '';
  return value.trim().toLowerCase();
}

function isValidEmail(email) {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildMessage() {
  const text = [
    'Hello,',
    '',
    'You asked us to send you the Encinitas Italian class information so you can return when you are ready.',
    '',
    `${details.kids.title}:`,
    details.kids.levels,
    details.kids.schedule,
    `First class: ${details.kids.start}`,
    `Schedule and pre-enrollment: ${details.kids.url}`,
    '',
    `${details.adults.title}:`,
    details.adults.levels,
    details.adults.schedule,
    `First class: ${details.adults.start}`,
    `Schedule and enrollment: ${details.adults.url}`,
    '',
    `${details.location.name}`,
    details.location.address,
    details.location.note,
    '',
    `Keep this overview: ${details.page_url}`,
    '',
    'Questions? Reply to this email or call (619) 800-0797.',
    '',
    'Italian school of San Diego LLC',
  ].join('\n');

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.55;color:#17202a;max-width:620px;margin:auto">
      <div style="border-top:7px solid #009246;border-bottom:7px solid #ce2b37;background:#0064aa;color:#fff;padding:22px 24px">
        <h1 style="font-family:Georgia,serif;font-size:30px;line-height:1.1;margin:0">Italian classes in Encinitas</h1>
        <p style="margin:8px 0 0">Class details saved for later</p>
      </div>
      <div style="padding:22px 24px;border:1px solid #d8e2ea;border-top:0">
        <p>Hello,</p>
        <p>You asked us to send you the Encinitas Italian class information so you can return when you are ready.</p>
        <h2 style="color:#003f70;font-family:Georgia,serif;margin-bottom:6px">${details.kids.title}</h2>
        <p style="margin-top:0"><strong>${details.kids.levels}</strong><br>${details.kids.schedule}<br>First class: ${details.kids.start}</p>
        <p><a href="${details.kids.url}" style="color:#0064aa;font-weight:bold">View the kids schedule and pre-enroll</a></p>
        <h2 style="color:#003f70;font-family:Georgia,serif;margin-bottom:6px">${details.adults.title}</h2>
        <p style="margin-top:0"><strong>${details.adults.levels}</strong><br>${details.adults.schedule}<br>First class: ${details.adults.start}</p>
        <p><a href="${details.adults.url}" style="color:#0064aa;font-weight:bold">View the adult schedule and enroll</a></p>
        <div style="background:#eef6fc;border-left:5px solid #ce2b37;padding:12px 15px;margin:20px 0">
          <strong>${details.location.address}</strong><br>${details.location.name}<br>${details.location.note}
        </div>
        <p><a href="${details.page_url}" style="color:#0064aa;font-weight:bold">Keep the short class overview</a></p>
        <p>Questions? Reply to this email or call <a href="tel:+16198000797" style="color:#0064aa">(619) 800-0797</a>.</p>
        <p>Italian school of San Diego LLC</p>
      </div>
    </div>`;

  return { text, html };
}

async function sendDetailsEmail(email) {
  const message = buildMessage();
  const response = await fetch(RESEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.ENCINITAS_LEAD_FROM || 'Italian school of San Diego <classes@sandiegodata.science>',
      to: email,
      bcc: process.env.ENCINITAS_LEAD_NOTIFY_TO || 'andrea.zonca@gmail.com',
      reply_to: 'info@italianschoolsd.com',
      subject: 'Your Encinitas Italian class information',
      text: message.text,
      html: message.html,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend request failed: ${response.status} ${body}`);
  }
}

exports.handler = async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('Encinitas details email unavailable: RESEND_API_KEY is not configured');
    return jsonResponse(503, { error: 'Email service is temporarily unavailable.' });
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (_error) {
    return jsonResponse(400, { error: 'Invalid request.' });
  }

  if (body.website) {
    return jsonResponse(200, { ok: true });
  }

  const email = normalizeEmail(body.email);
  if (!isValidEmail(email)) {
    return jsonResponse(400, { error: 'Enter a valid email address.' });
  }

  try {
    await sendDetailsEmail(email);
    return jsonResponse(200, { ok: true });
  } catch (error) {
    console.error('Encinitas details email failed', error);
    return jsonResponse(502, { error: 'Unable to send the email.' });
  }
};

exports._test = {
  buildMessage,
  isValidEmail,
  normalizeEmail,
};
