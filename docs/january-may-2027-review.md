# January-May adult class review

Compared the new enrollment pages with the Fall Beginner, Intermediate, Conversation, and October Encinitas pages, plus the previous January-May and Summer advanced pages. Source content is under `site/content/news/`; the new schedule and prices remain authoritative in `site/data/adult_january_may_2027.json`.

## Corrections

- Per the final book decision, only Beginner classes reference The New Italian Project 1a. Other levels have no book titles or purchasing links. Only the two in-person Beginner classes offer the enrollment book add-on; online Beginner has no pickup add-on.
- Restored the existing level-placement form and previous-session links removed from the adult overview.
- Clarified the adult refund wording to cover cancellation between the full-refund deadline and the first class, matching the previous class pages' 50% refund before the second class. The overview previously left that interval unspecified.
- Corrected preview Checkout return URLs so canceling or completing enrollment stays on the preview instead of production. Production keeps its canonical URL.
- Corrected monthly arithmetic for short months. Invoice dates and subscription cancellation now clamp month-end anchors instead of rolling February into March. This follows [Stripe's UTC billing-cycle rules](https://docs.stripe.com/billing/subscriptions/billing-cycle). Regression tests cover January 31, leap years, the early payment schedule, actual invoice scheduling, and subscription cancellation.
- Updated the billing guide's stale Thursday reference for online Beginner.

## Preserved behavior

- Separate pages for each level, class descriptions before enrollment, online sections last, and links to individual class sections.
- Andrea confirmed Thursday 6:30-8:00 PM for the in-person Beginner with Silvia on November 26. Its 18 dates now run January 14-May 20, excluding April 1; tuition and enrollment anchors are unchanged.
- Andrea approved applying Friday 6:00-7:30 PM for the online Beginner with Glenda: 17 lessons January 15-May 21, excluding February 12 and April 2. Shared data, public timetable, lesson dates, and Checkout now use Friday, $578 full tuition or five payments of $127.16. Glenda's availability for Friday still requires confirmation. The full session has 222 dates. Friday evening has no online conflict in the school calendars checked for the full term. The adult-only Zoom regression check does not include children's calendar events.
- Tuition calculations, family discounts, installment counts, required monthly commitment, January first-charge cutoff, immediate later enrollment, and book tax remain covered by the function tests.
- The existing Fall enrollment forms keep their published prices, book options, family selectors, and required monthly commitment.
- Silvia is assigned to the Thursday Beginner section. Glenda accepted the online course at the old Wednesday time; her availability for a replacement day remains to be confirmed. The Saturday spring-break assumption remains documented in the planning sheet and PR.

## Validation and limits

Function tests cover the new date and return-URL defects alongside existing billing behavior. Hugo build, navigation checks, production-style checks, and touched-JavaScript lint are run before delivery. Rendered HTML is compared against the old enrollment forms and checked for descriptions, the permitted Beginner book references, book add-ons, and both payment options in every new section. Desktop/mobile review checks the restored text and overview links.

No enrollment or charge is submitted during this review. Prior temporary live Checkout and tax validation remains documented in `deferred-class-billing.md`; an actual saved-card enrollment and future charge still have not been exercised with a real card.
