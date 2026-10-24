/**
 * Renders public/og.jpg, the 1200×630 social-media preview, from the live front page.
 *
 * Usage: node scripts/og-image.mjs [url]
 *   url   the front page to photograph; default http://localhost:4321/
 *         (run `npm run dev` or `npm run preview` first)
 * Needs a Chrome: Google Chrome on this machine, or set OG_BROWSER to a Chromium executable.
 *
 * The edition date and issue number are removed before the capture so the preview does not go stale.
 */
import { chromium } from "playwright-core";
import sharp from "sharp";

const url = process.argv[2] ?? "http://localhost:4321/";
const out = new URL("../public/og.jpg", import.meta.url).pathname;
const launch = process.env.OG_BROWSER ? { executablePath: process.env.OG_BROWSER } : { channel: "chrome" };

const browser = await chromium.launch(launch);
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2, colorScheme: "light" });
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => {
  // A preview has no date: keep "Madras" and the volume, drop the day and the issue number.
  const date = document.querySelector(".edition .date");
  const city = date?.querySelector(".city")?.textContent;
  if (date && city) date.textContent = city;
  const vol = document.querySelector(".edition .vol");
  const volume = vol?.querySelector("[data-edition-volume]")?.textContent;
  if (vol && volume) vol.textContent = `Vol. ${volume}`;
  // The dev server's toolbar is not part of the paper.
  document.querySelector("astro-dev-toolbar")?.remove();
});
await page.waitForTimeout(500);
// Photographed at 2× for crisp type, then set down to the 1200×630 the meta tags declare.
const shot = await page.screenshot({ type: "png", clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
const { size } = await sharp(shot).resize(1200, 630).jpeg({ quality: 86, mozjpeg: true }).toFile(out);
console.log(`wrote ${out} (${Math.round(size / 1024)} KB)`);
