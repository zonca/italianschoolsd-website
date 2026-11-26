# World Languages page header, source

`site/assets/img/world-languages/world-languages-flags.webp` (2000x800) is the
header image of `/world-languages/`: a tilted mosaic of country flags with
Germany, Spain, the United States, Italy, Mexico, Austria, the United Kingdom,
Switzerland, Argentina, France, Colombia and Japan placed near the center.

The flags come from flag-icons 7.2.3 by Panayiotis Lipiridis
(https://github.com/lipis/flag-icons), MIT License. Disputed or politically
sensitive flags are left out of the mosaic on purpose.

## Rebuild

1. Download the package: `curl -L -o fi.tgz https://registry.npmjs.org/flag-icons/-/flag-icons-7.2.3.tgz && tar xzf fi.tgz`
2. Run `python3 build.py <path to package/flags/4x3> out.png` (needs Chrome and Pillow).
3. Inspect `out.png`, then save it as the webp above.
