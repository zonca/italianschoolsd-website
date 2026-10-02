# German October 2026 adult flyer, source

Beginner German for adults, Tuesdays 6:00-7:30 PM, October 13 to December 22,
2026, in Kearny Mesa. It highlights the curriculum collaboration with German
Pacific School San Diego. Published at `site/static/flyers/german-october-2026.{png,pdf}`:

- https://www.italianschoolsd.com/flyers/german-october-2026.png
- https://www.italianschoolsd.com/flyers/german-october-2026.pdf

## Files

- `flyer.html` is the whole design: one 1080x1350 canvas (4:5, Facebook feed and
  print), adapted from the World Languages October 2026 flyer. Fonts load from
  Google Fonts and cdnfonts, so the build needs network access. The `@page` rule
  keeps the PDF on a single page.
- `logo.png` is the school logo.
- `gpssd-logo.png` is the German Pacific School San Diego logo, taken from
  `site/static/img/world-languages/`. Replace it when they send a higher-resolution
  version.
- `photo.jpg` is the Brandenburg Gate by Pierre-Selim Huard, from Wikimedia
  Commons (https://commons.wikimedia.org/wiki/File:Berlin_-_0266_-_16052015_-_Brandenburger_Tor.jpg),
  licensed Creative Commons Attribution 4.0. The license requires the credit
  line printed on the photo; never remove it.
- `qr.png` points to https://www.italianschoolsd.com/german/ and was made with
  `qrencode -o qr.png -s 12 -m 1 -l M "https://www.italianschoolsd.com/german/"`.

## Rebuild

Change the dates or copy in `flyer.html`, run `./build.sh`, inspect the PNG at
full size and at 360 pixels wide, and commit the regenerated PNG and PDF with
the source change. Keep the schedule consistent with the current news post
(`site/content/news/german-spanish-english-classes-adults-san-diego-october-2026.md`).
Do not print tuition on the flyer; the `/german` page links to current pricing.
