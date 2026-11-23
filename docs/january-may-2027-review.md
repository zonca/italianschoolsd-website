# January-May adult class review

Compared the new enrollment pages with the Fall Beginner, Intermediate, Conversation, and October Encinitas pages, plus the previous January-May and Summer advanced pages. Source content is under `site/content/news/`; the new schedule and prices remain authoritative in `site/data/adult_january_may_2027.json`.

## Corrections

- Restored continuing-class textbook information. Daniela's Monday group and Laura's Monday group retain The New Italian Project 1b; the groups progressing from Fall Beginner retain Project 1a. Continuing online groups retain the Espresso textbook and workbook links. Conversation retains teacher-provided materials and no required textbook.
- Kept textbook identification separate from purchasing: only the two in-person Beginner classes have an enrollment book add-on, as requested. Restoring the other titles does not enable their book purchases.
- Restored the existing level-placement form and previous-session links removed from the adult overview.
- Clarified the adult refund wording to cover cancellation between the full-refund deadline and the first class, matching the previous class pages' 50% refund before the second class. The overview previously left that interval unspecified.
- Corrected preview Checkout return URLs so canceling or completing enrollment stays on the preview instead of production. Production keeps its canonical URL.
- Corrected monthly arithmetic for short months. Invoice dates and subscription cancellation now clamp month-end anchors instead of rolling February into March. This follows [Stripe's UTC billing-cycle rules](https://docs.stripe.com/billing/subscriptions/billing-cycle). Regression tests cover January 31, leap years, the early payment schedule, actual invoice scheduling, and subscription cancellation.
- Updated the billing guide's stale Thursday reference for online Beginner.

## Preserved behavior

- Separate pages for each level, class descriptions before enrollment, online sections last, and links to individual class sections.
- All scheduled sections and lesson dates, including the Wednesday online Beginner decision, remain in the shared schedule. The shared-Zoom overlap check still applies between adult sections. The later request for Wednesday Beginner at 6:00-7:30 PM overlaps the existing online teen class at 5:00-7:00 PM; the single-room conflict must be resolved before publication.
- Tuition calculations, family discounts, installment counts, required monthly commitment, January first-charge cutoff, immediate later enrollment, and book tax remain covered by the function tests.
- The existing Fall enrollment forms keep their published prices, book options, family selectors, and required monthly commitment.
- Teachers for the new Beginner sections remain unconfirmed in the planning sheet; public pages do not invent assignments. The Saturday spring-break assumption remains documented in the planning sheet and PR.

## Validation and limits

Function tests cover the new date and return-URL defects alongside existing billing behavior. Hugo build, navigation checks, production-style checks, and touched-JavaScript lint are run before delivery. Rendered HTML is compared against the old enrollment forms and checked for descriptions, materials, book add-ons, and both payment options in every new section. Desktop/mobile review checks the restored text and overview links.

No enrollment or charge is submitted during this review. Prior temporary live Checkout and tax validation remains documented in `deferred-class-billing.md`; an actual saved-card enrollment and future charge still have not been exercised with a real card.
