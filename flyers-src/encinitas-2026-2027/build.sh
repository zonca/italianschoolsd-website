#!/usr/bin/env bash
# Rebuild the Encinitas 2026-2027 kids flyer (letter size, 200 dpi).
# The rendered PNG and PDF are the published artifacts in site/static/flyers/.
set -euo pipefail
cd "$(dirname "$0")"
OUT=../../site/static/flyers
google-chrome --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --window-size=1700,2200 --screenshot=/tmp/flyer.png flyer.html
google-chrome --headless --disable-gpu --no-sandbox \
  --no-pdf-header-footer --print-to-pdf=/tmp/flyer.pdf flyer.html
mv /tmp/flyer.png "$OUT/italianschoolsd-flyer-encinitas-2026-2027.png"
mv /tmp/flyer.pdf "$OUT/italianschoolsd-flyer-encinitas-2026-2027.pdf"
echo "Rebuilt $OUT/italianschoolsd-flyer-encinitas-2026-2027.{png,pdf}"
