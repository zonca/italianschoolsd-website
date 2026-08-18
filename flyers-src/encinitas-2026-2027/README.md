# Encinitas 2026-2027 kids flyer, source

The published flyer lives at `site/static/flyers/italianschoolsd-flyer-encinitas-2026-2027.{png,pdf}`
and is linked from the Encinitas news post. It was originally committed as
binaries with no source, so a wrong date could not be corrected without
rebuilding the artwork from the rendered image. This directory is that source.

- `flyer.html` is the whole design: one 1700x2200 canvas (8.5x11in at 200dpi),
  absolutely positioned, set in Georgia, the font the original used.
- `logo_sq.png`, `qr.png`, `photo.jpg` were extracted from the original PDF, so
  the artwork is the same artwork, not a lookalike.
- `./build.sh` re-renders both the PNG and the PDF in place.

Change the dates or copy in `flyer.html`, run `./build.sh`, and commit the
regenerated PNG and PDF alongside the source change.

The 1080x1350 social variant, `...-encinitas-2026-2027-social.png`, carries no
end date and is unaffected by schedule changes.
