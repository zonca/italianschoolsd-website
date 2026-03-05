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

- For page copy updates, edit files in `site/content/` only.
- For structure changes shared across pages, edit templates in `site/layouts/`.
- Prefer Markdown structure (headings/lists/paragraphs) over inline HTML unless a styled component is required.
- Keep tone concise, clear, and service-oriented.

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

## High-Risk Areas

- Global template changes in `site/layouts/_default/single.html` affect many pages.
- Global typography/list rules in `site/assets/css/imports/` affect the whole site.
- Keep global CSS changes minimal and targeted.
