#!/usr/bin/env bash
# Rebuild the German October 2026 adult flyer (1080x1350, 4:5 social and print).
# The rendered PNG and PDF are the published artifacts in site/static/flyers/.
set -euo pipefail
cd "$(dirname "$0")"
OUT=../../site/static/flyers
google-chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --allow-file-access-from-files --virtual-time-budget=8000 \
  --window-size=1080,1350 --screenshot=/tmp/german-flyer.png "file://$PWD/flyer.html"
google-chrome --headless=new --disable-gpu --no-sandbox \
  --allow-file-access-from-files --virtual-time-budget=8000 \
  --no-pdf-header-footer --print-to-pdf=/tmp/german-flyer.pdf "file://$PWD/flyer.html"
mv /tmp/german-flyer.png "$OUT/german-october-2026.png"
mv /tmp/german-flyer.pdf "$OUT/german-october-2026.pdf"
echo "Rebuilt $OUT/german-october-2026.{png,pdf}"
