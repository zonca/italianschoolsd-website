[![Netlify Status](https://api.netlify.com/api/v1/badges/188af8fb-aeab-4514-9937-3567ca350205/deploy-status)](https://app.netlify.com/sites/italianschoolsd/deploys)

# Website of the Italian school of San Diego

All instructors of the [Italian language school in San Diego](https://www.italianschoolsd.com/about/) are mother-tongue Italian, they teach to kids and adults.

See the [available Italian in-person classes in San Diego](https://www.italianschoolsd.com/classes), they are split in 2 tracks, one for people looking to learn Italian, one for kids that have Italian heritage and want to follow the same program taught in Italy's public school system.

Classes are online and in-person in Kearny Mesa, San Diego

## Stripe Checkout

Fall 2026 class enrollment uses Netlify Functions and Stripe Checkout.

Required Netlify environment variables:

- `STRIPE_SECRET_KEY` (server API key with permission to create Checkout Sessions and update Subscriptions)
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `CHECKOUT_ALERT_FROM` (default: `Italian School Alerts <alerts@sandiegodata.science>`)
- `CHECKOUT_ALERT_TO` (default: `andrea.zonca@gmail.com`)
- `CHECKOUT_ALERT_REPLY_TO` (default: `andrea.zonca@gmail.com`)

Configure a Stripe webhook endpoint at:

```text
https://www.italianschoolsd.com/.netlify/functions/stripe-webhook
```

Subscribe it to at least:

- `checkout.session.completed`

The checkout function keeps the class catalog server-side in `netlify/lib/checkout/catalog.js`. Page content should call the `stripe-checkout` shortcode with the class ID and display prices; do not put Stripe secret keys or editable checkout amounts in Markdown.

Monthly class payments are for one student at a time and are created as Stripe subscriptions through Checkout. The webhook sets `cancel_at` on each monthly subscription so it stops after five monthly payments.

Pay-in-full same-class family enrollment is handled automatically in the checkout function: the first student is charged full tuition, and each additional family member in the same transaction is charged 90% tuition. Books are charged at full price for each selected student.
