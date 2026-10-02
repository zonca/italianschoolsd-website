# AGENTS.md

Operational guide for AI/code agents working on `italianschoolsd-website`.

## Scope

- This is a Hugo-based website.
- Primary content lives under `site/content/`.
- Shared layouts live under `site/layouts/`.
- Shared styles live under `site/assets/css/imports/`.

## Fast Workflow

1. Edit content/templates/styles.
2. Run `npm run build:hugo`.
3. Inspect generated output in `dist/` for the specific page changed.
4. Commit with a focused message.
5. Rebase on `origin/main` before pushing if remote moved.

## Commands

- Dev server: `npm run start`
- Build: `npm run build:hugo`
- Preview with drafts/future posts: `npm run preview`
- JS lint (only for JS files touched): `npm run lint`

## Content Editing Rules

- Filenames for news and posts MUST match their slug (the title as it appears in the URL). For example, if the URL is `/news/2026/03/my-cool-post/`, the filename should be `my-cool-post.md`.
- For page copy updates, edit files in `site/content/` only.
- For structure changes shared across pages, edit templates in `site/layouts/`.
- Prefer Markdown structure (headings/lists/paragraphs) over inline HTML unless a styled component is required.
- ALWAYS create manual heading anchors for all main sections using the `{#anchor-name}` syntax (e.g., `## My Section {#my-section}`). This allows users to link directly to specific parts of the page.
- Use sentence case for all public-facing headings and page titles: capitalize only the first word and proper nouns. Never use title case such as `What You Will Practice`; write `What you will practice` instead.
- Keep tone concise, clear, and service-oriented.
- Late enrollment uses regular tuition prorated for remaining classes, plus the flat late enrollment fee after the cutoff specified in the canonical payment-policy page. Do not increase the tuition rates by a percentage. Display regular tuition as the basis for proration and list applicable fees separately. Read current amounts and cutoff dates from the canonical enrollment and payment-policy pages; news articles and examples should link there instead of duplicating them.

## Mandatory Verification

Every task MUST be verified before finality. Do not assume success based on successful commands.

1.  **Visual Verification:** If you create or modify visual assets (PDFs, flyers, complex CSS), convert them to images (e.g., using `pdftoppm` or screenshots) and inspect them.
2.  **Link Integrity:** If you add or modify links (including anchors), test them. Use `curl`, `wget --spider`, or automated browser tools to ensure they resolve to the expected content.
3.  **Functional Testing:** For website modifications, use `curl -s | grep` to verify rendered HTML structure. For complex interactions, use Playwright or similar tools if available in the environment to confirm the UX works as intended.
4.  **Local Build Check:** Always run `npm run build:hugo` and inspect the `dist/` output for the specific page changed. Verify that the generated HTML matches your expectations.

Validation is the only path to finality. A task is not complete until you have empirically confirmed it works.

## Typography and Spacing Guardrails

- Single content pages should render content inside a `.cms` container.
- If spacing between headings/lists/paragraphs looks wrong, check whether the template includes `class="cms"`.
- Prefer fixing shared template/styling causes rather than patching one page with ad-hoc HTML spacing.
- Keep CTA button patterns consistent with existing classes (`btn btn-cta`).

## Visual QA Checklist

After any content/layout/CSS change:

1. Build locally with `npm run build:hugo`.
2. Inspect `dist/<slug>/index.html` for expected rendered structure.
3. Verify heading/list spacing around edited sections.
4. Verify mobile-friendly readability (no overly dense blocks).
5. Confirm links and CTA buttons are still valid.

## Git and Push Rules

- Never force push `main`.
- If push is rejected, run:
  - `git fetch origin`
  - `git rebase origin/main`
  - resolve conflicts
  - `git push origin main`
- Do not rewrite or drop unrelated user changes.

## Deploy/Published Verification

- `main` push triggers deployment; published site may lag behind commit by a short time.
- If user asks to inspect published page, verify both:
  - live URL (what users currently see)
  - local built output (what next deploy should show)
- If mismatch exists, state clearly that deploy has not caught up yet.

## Class enrollment checkout

- Use the existing Stripe checkout flow for class enrollment. Add each class to `netlify/lib/checkout/catalog.js` and render the `stripe-checkout` shortcode on its public class page. The shortcode posts to the Netlify Checkout Session function; do not create a second enrollment payment method or standalone payment link.
- Keep the class page, catalog amount, installment count, anchor, and return URL consistent. Verify the rendered full and monthly forms and the resulting Checkout Session parameters before publishing.
- For optional physical books, use the catalog's book identifier and verify Stripe automatic tax is enabled, billing address collection is required, and the book line uses tangible goods tax code `txcd_99999999` (or books code `txcd_35010000`). Confirm applicable California sales tax is collected before publishing.

## Newsletter (Listmonk)

- The newsletter system (Listmonk) is available through its public API at `https://list.italysd.com/api/campaigns`.
- Use the public API from the local machine. The root project guidelines prohibit ad-hoc work on the `sh` production server.
- **Credentials:** Use the `listmonkapi` user. The token is stored in the local `.bashrc` as `LISTMONK_TOKEN`. **NEVER** hardcode or log this token.
- **Workflow for Drafts:**
    1. Prepare the newsletter body in Markdown.
    2. Use Python on the local machine to safely package the body into a JSON payload for the API (avoids shell quoting issues).
    3. For a schoolwide newsletter, target all four standard lists: `2` (Programs for Kids), `3` (Programs for Adults), `4` (Current Students - Kids), and `5` (Current Students - Adults), unless Andrea explicitly selects a narrower audience. Verify the live list names before creating the campaign.
    4. Default Template ID: `4` (Italian School Campaign Template).
- **Media/Attachments:**
    - Embed an image only when Andrea explicitly asks for it. When sharing flyers by download link, use public PDF links in the body without inline images. If an image is requested, use a public URL (e.g., from the website or Netlify preview).
    - To add an attachment, first POST the file to `/api/media`, then include the resulting ID in the `media` array of the campaign object.
- **Verification:** Always create as a `draft` status first. Verify links (prefer production `www.italianschoolsd.com` links for final drafts) and layout in the Listmonk dashboard before sending.

### Sample Python Script for Creating Drafts

The following script can be used on the local machine to safely package Markdown and create a draft via the public API:

```python
import json
import urllib.request
import base64
import sys
import os

# Usage: python3 create_draft.py "Campaign Name" "Subject" body.md
def create_draft(name, subject, body_path):
    with open(body_path, "r") as f:
        body = f.read()

    payload = {
        "name": name,
        "subject": subject,
        "lists": [2, 3, 4, 5],  # All programs and current students
        "type": "regular",
        "content_type": "markdown",
        "body": body,
        "template_id": 4,
        "status": "draft",
        "attribs": {"trackClicks": True, "trackViews": True}
    }

    token = os.environ["LISTMONK_TOKEN"]
    auth = base64.b64encode(f"listmonkapi:{token}".encode()).decode()
    req = urllib.request.Request(
        "https://list.italysd.com/api/campaigns",
        data=json.dumps(payload).encode(),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Basic {auth}"
        },
        method="POST"
    )

    try:
        with urllib.request.urlopen(req) as res:
            print(res.read().decode())
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python3 create_draft.py <name> <subject> <body_file>")
    else:
        create_draft(sys.argv[1], sys.argv[2], sys.argv[3])
```

## High-Risk Areas

- Global template changes in `site/layouts/_default/single.html` affect many pages.
- Global typography/list rules in `site/assets/css/imports/` affect the whole site.
- Keep global CSS changes minimal and targeted.
