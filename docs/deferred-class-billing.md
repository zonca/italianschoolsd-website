# Deferred class billing

January-May 2027 classes use the existing website enrollment forms and Checkout function. Each section has full-payment and installment anchors, `#enroll-<class-id>-full` and `#enroll-<class-id>-monthly`. Stripe Checkout URLs are generated when a student submits the form, so shared enrollment links do not expire like individual Checkout Sessions.

Prices, lesson dates, and `chargeNotBefore` are maintained in `site/data/adult_january_may_2027.json`. The cutoff is January 2, 2027 at midnight Pacific Time. The catalog computes all tuition amounts from this data.

## Before the cutoff

Checkout runs in setup mode and creates a customer when the student saves a card. The displayed authorization quotes the exact amount and payment dates. A signed `checkout.session.completed` webhook verifies the successful SetupIntent and customer before scheduling any tuition.

The webhook creates one draft invoice for full payment, or five for installments. Each invoice contains only the agreed tuition, uses the saved payment method, and automatically finalizes on the scheduled date. Early installment dates are January 2 through May 2. This uses Stripe's invoice scheduler, with no application timer or cron job. A completion delivered after the first scheduled date collects the overdue first payment immediately.

Invoices begin with automatic advancement disabled until the amount has been verified. Customer invoice metadata plus Stripe idempotency keys let webhook retries resume partially completed scheduling without adding another tuition invoice or line. A void, uncollectible, duplicate, or amount-mismatched invoice requires review rather than another charge. Webhook errors use the existing school error alerts and Stripe retry delivery.

## On or after the cutoff

The existing immediate-payment and five-payment subscription flows apply. Full tuition or the first installment is charged in Checkout; subsequent subscription payments follow the enrollment date. Legacy class checkout behavior is preserved.

## Publication and operations

Deploy the Checkout function, webhook, catalog, and public page together through the website PR. Keep the existing `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and enabled `checkout.session.completed` endpoint. No new webhook event subscription is required. Saving a card without the updated webhook would not schedule tuition.

The school's existing live endpoint was checked as enabled for `checkout.session.completed`. Four temporary live Checkout Sessions were accepted by Stripe to verify the full/monthly setup and immediate variants, then expired without submitting a card or collecting payment. Invoice scheduling and webhook recovery are covered by automated request-level tests; a completed saved-card enrollment and a future invoice charge have not been exercised against Stripe with a real card.

For an early enrollment, use `checkout_session_id` and `installment_number` invoice metadata in Stripe Dashboard to confirm the scheduled invoices and their amounts. Future automatic collections use Stripe's configured payment recovery settings; a saved card does not guarantee that a later charge succeeds. Do not also create a subscription for an early invoice-based enrollment, which would bill it twice.

No textbooks are offered for these sections until materials are confirmed. Any future book purchase must use the existing taxable-book checkout flow.

Stripe references: [save payment details with Checkout](https://docs.stripe.com/payments/save-and-reuse?platform=web&ui=stripe-hosted), [schedule invoice finalization](https://docs.stripe.com/api/invoices/update#update_invoice-automatically_finalizes_at), [pay an invoice](https://docs.stripe.com/api/invoices/pay).
