import { phone, SONG, log } from "./common.mjs";
const { browser, context, page } = await phone();
await page.goto(SONG, { waitUntil: "domcontentloaded" });
for (let i = 0; i < 16; i++) {
  await page.waitForTimeout(500);
  for (const name of [/got it/i, "ยอมรับ"]) { const btn = page.getByRole("button", { name }); if (await btn.count()) { await btn.first().click({ force: true }).catch(() => {}); } }
}
log("localStorage", await page.evaluate(() => Object.fromEntries(Object.entries(localStorage).filter(([k]) => k.startsWith("busk")))));
log("still has Got it / ยอมรับ?", await page.evaluate(() => [...document.querySelectorAll("button")].map(b => b.innerText.trim()).filter(t => /got it|ยอมรับ/i.test(t))));
await context.storageState({ path: new URL("./state.json", import.meta.url).pathname });
await browser.close();
