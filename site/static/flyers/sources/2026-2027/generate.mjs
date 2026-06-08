import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join, resolve } from "node:path";

const sourceDir = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(sourceDir, "../..");

const flyers = [
  "italianschoolsd-flyer-italian-2026-2027-kids",
  "italianschoolsd-flyer-italian-2026-2027-teens",
];

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
});

try {
  for (const flyer of flyers) {
    const page = await browser.newPage({
      viewport: { width: 1275, height: 1650 },
      deviceScaleFactor: 1,
    });

    const htmlPath = join(sourceDir, `${flyer}.html`);
    const pngPath = join(outputDir, `${flyer}.png`);
    const pdfPath = join(outputDir, `${flyer}.pdf`);

    await page.goto(pathToFileURL(htmlPath).href);
    await page.screenshot({
      path: pngPath,
      fullPage: false,
      type: "png",
    });
    await page.close();

    execFileSync("convert", [
      pngPath,
      "-units",
      "PixelsPerInch",
      "-density",
      "150",
      pdfPath,
    ]);

    console.log(`Generated ${pngPath}`);
    console.log(`Generated ${pdfPath}`);
  }
} finally {
  await browser.close();
}
