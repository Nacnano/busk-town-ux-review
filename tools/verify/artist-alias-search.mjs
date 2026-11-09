import { chromium, UA, log } from "./common.mjs";
const browser = await chromium.launch({ headless: true });
const page = await (await browser.newContext({ viewport: { width: 390, height: 844 }, locale: "th-TH", userAgent: UA })).newPage();
await page.goto("https://busk.town/dashboard", { waitUntil: "domcontentloaded" }); await page.waitForTimeout(3000);
for (const name of ["ยอมรับ"]) { const b = page.getByRole("button", { name }); if (await b.count()) await b.first().click({ force: true }).catch(()=>{}); }
await page.getByRole("button", { name: "expand search box" }).first().click({ force: true }); await page.waitForTimeout(1000);
const input = page.locator("input[placeholder=Search]").first();
const results = async (q) => {
  await input.evaluate(i => i.focus()); await page.keyboard.press("Meta+A"); await page.keyboard.press("Backspace");
  await page.keyboard.type(q, { delay: 40 }); await page.waitForTimeout(2500);
  return page.evaluate(() => { const r = document.getElementById("navbar-search-results"); return r ? r.innerText.replace(/\n+/g, " | ").slice(0, 160) : "NO RESULTS CONTAINER"; });
};
let w = "NO RESULTS"; for (let i = 0; i < 12 && /NO RESULTS/.test(w); i++) { w = await results("new jiew"); }
log("warmup", w);
for (const q of ["carabao", "Carabao", "คาราบาว", "นิวจิ๋ว", "NEW JIEW", "บอดี้สแลม", "bodyslam"]) log(`search: ${q}`, await results(q));
await browser.close();
