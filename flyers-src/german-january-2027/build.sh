#!/usr/bin/env bash
# Rebuild the German January 2027 adult flyer (1080x1350, 4:5 social and print).
# The rendered PNG and PDF are the published artifacts in site/static/flyers/.
set -euo pipefail
cd "$(dirname "$0")"
OUT=../../site/static/flyers

CHROME_BIN="${CHROME_BIN:-$(command -v google-chrome || command -v chromium || ls -1d "$HOME"/.cache/ms-playwright/chromium-*/chrome-linux*/chrome 2>/dev/null | tail -n 1)}"
if [ -z "${CHROME_BIN:-}" ] || [ ! -x "$CHROME_BIN" ]; then
  echo "ERROR: Could not find Chrome/Chromium binary" >&2
  exit 1
fi

"$CHROME_BIN" --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --allow-file-access-from-files --virtual-time-budget=8000 \
  --window-size=1080,1350 --screenshot=/tmp/german-flyer.png "file://$PWD/flyer.html"
"$CHROME_BIN" --headless=new --disable-gpu --no-sandbox \
  --allow-file-access-from-files --virtual-time-budget=8000 \
  --no-pdf-header-footer --print-to-pdf=/tmp/german-flyer.pdf "file://$PWD/flyer.html"
mv /tmp/german-flyer.png "$OUT/german-january-2027.png"
mv /tmp/german-flyer.pdf "$OUT/german-january-2027.pdf"
echo "Rebuilt $OUT/german-january-2027.{png,pdf}"
