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

## Square Payment Links

- Single-use `square.link/u/...` URLs expire after one payment. Never use them for enrollment links that multiple students need.
- For reusable checkout links, use Square Online Store URLs (`italianschoolsd.square.site/product/...`).
- When creating a class + book bundle enrollment, update the Square Online bundle page at `italianschoolsd.square.site/bundle` (via Square Dashboard → Online → Site Editor) and link to it from the site.
- Square API credentials are in `square_credentials.json` (git-ignored). Use `uv run --with squareup python` to interact with the API.

## Newsletter (Listmonk)

- The newsletter system (Listmonk) is available on the `sh` server.
- Use the Listmonk API via `curl` on the `sh` server for operations (listening on `localhost:9000`).
- **Credentials:** Use the `listmonkapi` user. The token is stored in the local `.bashrc` as `LISTMONK_TOKEN`. **NEVER** hardcode or log this token.
- **Workflow for Drafts:**
    1. Prepare the newsletter body in Markdown.
    2. Use Python on the `sh` server to safely package the body into a JSON payload for the API (avoids shell quoting issues).
    3. Target List IDs: `2` (Programs for Kids), `3` (Programs for Adults).
    4. Default Template ID: `4` (Italian School Campaign Template).
- **Media/Attachments:**
    - To embed an image, use a public URL (e.g., from the website or Netlify preview).
    - To add an attachment, first POST the file to `/api/media`, then include the resulting ID in the `media` array of the campaign object.
- **Verification:** Always create as a `draft` status first. Verify links (prefer production `www.italianschoolsd.com` links for final drafts) and layout in the Listmonk dashboard before sending.

### Sample Python Script for Creating Drafts

The following script can be used on the `sh` server to safely package Markdown and create a draft via the API:

```python
import json
import urllib.request
import base64
import sys

# Usage: python3 create_draft.py TOKEN "Campaign Name" "Subject" body.md
def create_draft(token, name, subject, body_path):
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
        "status": "draft"
    }

    auth = base64.b64encode(f"listmonkapi:{token}".encode()).decode()
    req = urllib.request.Request(
        "http://localhost:9000/api/campaigns",
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
    if len(sys.argv) < 5:
        print("Usage: python3 create_draft.py <token> <name> <subject> <body_file>")
    else:
        create_draft(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])
```

## High-Risk Areas

- Global template changes in `site/layouts/_default/single.html` affect many pages.
- Global typography/list rules in `site/assets/css/imports/` affect the whole site.
- Keep global CSS changes minimal and targeted.
