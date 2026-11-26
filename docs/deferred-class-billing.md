# Deferred class billing

January-May 2027 classes use separate Beginner, Intermediate, and Advanced/Conversation pages, matching the previous quarter. The `pages` mapping in the shared data assigns each level to its canonical enrollment page. The public shortcodes and Checkout return URLs use that same mapping. Classes use the existing website enrollment forms and Checkout function. Each section has full-payment and installment anchors, `#enroll-<class-id>-full` and `#enroll-<class-id>-monthly`. Stripe Checkout URLs are generated when a student submits the form, so shared enrollment links do not expire like individual Checkout Sessions.

Prices, lesson dates, and `chargeNotBefore` are maintained in `site/data/adult_january_may_2027.json`. The cutoff is January 2, 2027 at midnight Pacific Time. The catalog computes all tuition amounts from this data.

All 13 sections, including Thursday in-person Beginner with Silvia and Friday online Beginner with Glenda, have complete lesson dates and use the same full/monthly enrollment forms. Silvia has accepted Thursday 6:30-8:00 PM in Kearny Mesa, January 14-May 20. Andrea approved applying Friday 6:00-7:30 PM for the online Beginner: 17 lessons January 15-May 21, excluding February 12 and April 2. The catalog now computes $578 full tuition or five payments of $127.16. Glenda's availability for the replacement Friday schedule remains to be confirmed; her existing Tuesday class is unchanged. The full session now has 222 lesson dates. Encinitas retains its two Friday sections, with Daniela at beginner and Laura at beginner-intermediate; enrollment anchors remain stable.

## Before the cutoff

Checkout runs in setup mode and creates a customer when the student saves a card. The displayed authorization quotes the exact amount and payment dates. A signed `checkout.session.completed` webhook verifies the successful SetupIntent and customer before scheduling any tuition.

The webhook creates one draft invoice for full payment, or five for installments. Each invoice contains only the agreed tuition, uses the saved payment method, and automatically finalizes on the scheduled date. Early installment dates are January 2 through May 2. This uses Stripe's invoice scheduler, with no application timer or cron job. A completion delivered after the first scheduled date collects the overdue first payment immediately.

Invoices begin with automatic advancement disabled until the amount has been verified. Customer invoice metadata plus Stripe idempotency keys let webhook retries resume partially completed scheduling without adding another tuition invoice or line. A void, uncollectible, duplicate, or amount-mismatched invoice requires review rather than another charge. Webhook errors use the existing school error alerts and Stripe retry delivery.

## On or after the cutoff

Tuition-only selections use the existing immediate-payment and five-payment subscription flows. Full tuition or the first installment is charged in Checkout; subsequent subscription payments follow the enrollment date. Legacy class checkout behavior is preserved.

Monthly dates use Stripe's UTC anchor convention and clamp to the last day of shorter months. For example, a January 31 enrollment continues on February 28, March 31, April 30, and May 31. Invoice scheduling and subscription cancellation share the same calculation to avoid skipping February or leaving a subscription active for an extra payment. See [Stripe's monthly billing anchor examples](https://docs.stripe.com/billing/subscriptions/billing-cycle).

Checkout return URLs recognize preview hosts in the site's own `--SITE_NAME.netlify.app` namespace and otherwise use the canonical site URL. This uses [Netlify's runtime variables](https://docs.netlify.com/build/functions/environment-variables/), rather than assuming that build-only context variables are available to functions. Unrelated request hosts cannot override the canonical return URL.

## Publication and operations

The billing backend was activated in production on 2026-11-23 through [PR #90](https://github.com/zonca/italianschoolsd-website/pull/90), merge commit `bc53450900c541304bb5ec896336257aed5fcb5b`, Netlify production deploy `6b04944450177133529f8516`. The public page changes remain in the separate website PR. Keep the existing `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and enabled `checkout.session.completed` endpoint. No new webhook event subscription is required. Future website releases must retain the activated billing functions and catalog.

Live verification used the production Checkout endpoint for both full and monthly enrollment. Both returned Stripe setup-mode Sessions with the January 2 first-charge timestamp, the correct payment count, and no immediate PaymentIntent. The production completion webhook was confirmed enabled. Stripe also accepted a temporary draft invoice with automatic collection and scheduled finalization at January 2, 2027 midnight Pacific; that invoice and its temporary customer were deleted, and both test Checkouts were expired. No card was entered and no charge was attempted. This verifies live configuration and scheduling acceptance; a real saved-card enrollment and its future charge have not been exercised.

The school's existing live endpoint was checked as enabled for `checkout.session.completed`. Four temporary live Checkout Sessions were accepted by Stripe to verify the full/monthly setup and immediate variants, then expired without submitting a card or collecting payment. Invoice scheduling and webhook recovery are covered by automated request-level tests; a completed saved-card enrollment and a future invoice charge have not been exercised against Stripe with a real card.

For an early enrollment, use `checkout_session_id` and `installment_number` invoice metadata in Stripe Dashboard to confirm the scheduled invoices and their amounts. Future automatic collections use Stripe's configured payment recovery settings; a saved card does not guarantee that a later charge succeeds. Do not also create a subscription for an early invoice-based enrollment, which would bill it twice.

In-person Beginner sections offer The New Italian Project 1a, with pickup at the classroom. Book selectors are available in both full and monthly enrollment. Online Beginner also references The New Italian Project 1a, without a book add-on. Other January-May levels omit book references.

Book combos use the saved-card invoice flow before and after January 2. The checkout function obtains a positive Stripe Tax quote for the classroom pickup address and includes the exact taxed first payment in the authorization. The first invoice has tax-exempt tuition and a taxable physical-book line with Stripe Automatic Tax and the same pickup address. It must match the quoted total and positive book tax before it can advance. Remaining monthly invoices contain tuition only. A partial book-line write resumes idempotently.

For book combos enrolled on/after January 2, the first invoice is collected immediately after the saved-card completion; the four remaining installments follow enrollment anniversaries. A zero or changed tax quote stops processing for review rather than collecting an untaxed book. Shared book metadata and prices are in `site/data/enrollment_books.json`.

Live validation confirmed positive book tax and draft invoice totals for both pickup locations. Drafts were deleted without finalization or payment.

Stripe references: [save payment details with Checkout](https://docs.stripe.com/payments/save-and-reuse?platform=web&ui=stripe-hosted), [schedule invoice finalization](https://docs.stripe.com/api/invoices/update#update_invoice-automatically_finalizes_at), [pay an invoice](https://docs.stripe.com/api/invoices/pay).
