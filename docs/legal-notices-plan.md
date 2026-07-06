# Legal Notices Pages For Privacy And Accessibility

## Summary

- Add a `Privacy Policy` page and link it from the global footer. This is the main notice that appears legally necessary for this site because it is a commercial website serving California users and it collects personal information through analytics, forms, and newsletter signup.
- Add an `Accessibility` page and link it from the global footer. This is a prudent compliance page for ADA and California accessibility risk management, even if it is not the same kind of explicit posting requirement as the privacy policy.
- Do not add a cookie banner or CCPA consumer-rights page by default under the current assumptions.

## Key Changes

- Create a non-published internal repo note at `docs/legal-notices-plan.md` with this plan.
- Create a published `Privacy Policy` page under `site/content/`.
- Create a published `Accessibility` page under `site/content/`.
- Update `site/layouts/partials/footer.html` to add links for `Privacy Policy` and `Accessibility`.

## Privacy Policy Content

- Identify the operator as Italian school of San Diego LLC with the existing contact email and phone.
- Disclose collection of analytics and device data via Google Analytics.
- Disclose collection of contact details and message content through the Netlify contact form.
- Disclose newsletter signup data through `list.italysd.com`.
- Disclose that users may submit information through linked Google Forms for enrollment, jobs, consultations, and event registration.
- Explain collection purposes: responding to inquiries, registrations, applications, communications, site operations, analytics, and improvement.
- Name the relevant third-party services: Google Analytics, Google Forms, Google Calendar embeds, Algolia DocSearch, Netlify forms, and the mailing-list service.
- State that third-party services linked or embedded on the site may have their own privacy practices.
- Include a cookies and tracking disclosure.
- Include a CalOPPA `Do Not Track` disclosure. Default: the site does not currently respond differently to browser `Do Not Track` signals.
- Include an effective date and update statement.

## Accessibility Page Content

- State an accessibility commitment for the website.
- Use WCAG 2.1 AA as the working target standard.
- Provide the existing email and phone for reporting accessibility issues or requesting help.
- Mention the practical areas to maintain: keyboard access, readable structure, meaningful alt text, form labels, and mobile readability.
- State that third-party services may be outside the school’s direct control.
- Do not claim certified or audited compliance unless separately verified.

## Test Plan

- Run `npm run build:hugo`.
- Verify the two new pages render correctly in `dist/`.
- Verify both pages use the standard single-page content wrapper and spacing.
- Verify the footer links appear globally.
- Verify the privacy policy accurately matches the integrations currently present in `site/layouts/_default/baseof.html`, `site/layouts/partials/footer.html`, and existing content links.
- Verify the accessibility page includes a working contact path and does not overpromise.

## Assumptions

- Assumed the business is below CCPA and CPRA applicability thresholds.
- Assumed the site collects information from parents and adults, not directly from children under 13.
- Assumed the goal is practical website compliance coverage, not legal advice.
- If CCPA thresholds are met later, expand the privacy work to include CCPA notice-at-collection and consumer-rights workflows.
