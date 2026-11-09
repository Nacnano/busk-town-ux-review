import { chromium } from "playwright";
import { existsSync } from "node:fs";
export { chromium };
export const UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";
// Run state.mjs once to save a profile with the cookie banner and tools tooltip dismissed.
const state = new URL("./state.json", import.meta.url).pathname;
export async function phone(opts = {}) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ ...(existsSync(state) ? { storageState: state } : {}), viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: "dark", locale: "th-TH", userAgent: UA, ...opts });
  const page = await context.newPage();
  page.setDefaultTimeout(20000);
  return { browser, context, page };
}
export async function dismiss(page) {
  for (const name of [/got it/i, "ยอมรับ", /accept/i]) {
    const btn = page.getByRole("button", { name });
    if (await btn.count()) await btn.first().click().catch(() => {});
  }
  await page.waitForTimeout(200);
}
export const SONG = "https://busk.town/songs/%E0%B8%A3%E0%B8%AD-masha";
export const log = (k, v) => console.log(`\n### ${k}\n` + (typeof v === "string" ? v : JSON.stringify(v, null, 1)));
