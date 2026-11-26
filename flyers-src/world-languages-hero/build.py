"""Render the World Languages header flag mosaic (2000x800 PNG and WEBP)."""
import os, random, subprocess, sys, tempfile
from PIL import Image

src, out = os.path.abspath(sys.argv[1]), sys.argv[2]
skip = set("ps tw xk eh il ru by ir kp sy af aq bv hm um sj gs io tf cp dg ea ic ta ac".split())
featured = ["de", "es", "us", "it", "mx", "at", "gb", "ch", "ar", "fr", "co", "jp"]
pool = [f[:-4] for f in sorted(os.listdir(src)) if len(f) == 6 and f[:-4] not in skip]
random.seed(11); random.shuffle(pool)
pool = [c for c in pool if c not in featured]
cols, rows = 20, 10
cells = pool[:cols * rows]
spots = [(3, 9), (3, 11), (3, 13), (4, 10), (4, 12), (4, 14), (5, 9), (5, 11), (5, 13), (6, 10), (6, 12), (6, 14)]
for code, (r, c) in zip(featured, spots):
    cells[r * cols + c] = code
imgs = "".join(f'<img src="file://{src}/{c}.svg">' for c in cells)
html = f'''<!doctype html><html><head><style>
html,body{{margin:0;width:2000px;height:800px;overflow:hidden;background:#e9f1f8}}
.grid{{position:absolute;left:-260px;top:-330px;display:grid;grid-template-columns:repeat({cols},136px);gap:18px;transform:rotate(-8deg)}}
.grid img{{width:136px;height:102px;object-fit:cover;border-radius:10px;box-shadow:0 6px 16px rgba(10,53,89,.28)}}
.veil{{position:absolute;inset:0;background:linear-gradient(90deg,rgba(10,53,89,.35) 0%,rgba(10,53,89,.08) 45%,rgba(10,53,89,0) 70%)}}
</style></head><body><div class="grid">{imgs}</div><div class="veil"></div></body></html>'''
with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f:
    f.write(html)
subprocess.run(["google-chrome", "--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars",
                "--allow-file-access-from-files", "--window-size=2000,800", f"--screenshot={os.path.abspath(out)}",
                f"file://{f.name}"], check=True, capture_output=True)
Image.open(out).convert("RGB").save(os.path.splitext(out)[0] + ".webp", "WEBP", quality=82)
