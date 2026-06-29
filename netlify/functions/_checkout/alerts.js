async function sendErrorAlert(subject, details) {
  if (!process.env.RESEND_API_KEY) {
    console.error('Resend alert skipped: RESEND_API_KEY is not configured');
    return;
  }

  const to = process.env.CHECKOUT_ALERT_TO || 'andrea.zonca@gmail.com';
  const from = process.env.CHECKOUT_ALERT_FROM || 'Italian School Alerts <alerts@sandiegodata.science>';
  const replyTo = process.env.CHECKOUT_ALERT_REPLY_TO || 'andrea.zonca@gmail.com';

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: replyTo,
      subject,
      text: typeof details === 'string' ? details : JSON.stringify(details, null, 2),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(`Resend alert failed: ${response.status} ${body}`);
  }
}

module.exports = {
  sendErrorAlert,
};
