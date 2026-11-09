import { phone, SONG, log } from "./common.mjs";
const { browser, page } = await phone();
await page.goto(SONG, { waitUntil: "domcontentloaded" }); await page.waitForTimeout(3000);
const sheetOpen = () => page.evaluate(() => !![...document.querySelectorAll("*")].find(e => e.children.length===0 && /^Font size$/.test((e.textContent||"").trim()) && e.getBoundingClientRect().width>0));
for (let i=0;i<3 && !(await sheetOpen());i++) { await page.getByRole("button", { name: /show more tools/i }).first().click({ force: true }); await page.waitForTimeout(800); }
log("sheet open", await sheetOpen());
const toggled = await page.evaluate(() => { const el = [...document.querySelectorAll("*")].find(e => e.children.length===0 && /^Metronome$/.test((e.textContent||"").trim()) && e.getBoundingClientRect().width>0); let row = el; for (let i=0;i<4 && row;i++) { row = row.parentElement; const c = row.querySelector("button, input, [role=switch]"); if (c) { c.click(); return c.tagName + " role=" + c.getAttribute("role") + " checked=" + (c.getAttribute("aria-checked")||c.checked); } } return "no control"; });
log("toggled", toggled); await page.waitForTimeout(800);
log("sheet text after toggle", await page.evaluate(() => { const el = [...document.querySelectorAll("*")].find(e => e.children.length===0 && /^Tools$/.test((e.textContent||"").trim()) && e.getBoundingClientRect().width>0); let box = el; for (let i=0;i<4 && box;i++) box = box.parentElement; return box ? box.innerText.replace(/\n+/g," | ").slice(0,600) : "nf"; }));
await page.screenshot({ path: "tools-metro-on.jpg", type: "jpeg", quality: 50 });
await page.evaluate(() => { const el = [...document.querySelectorAll("*")].find(e => e.children.length===0 && /^Tools$/.test((e.textContent||"").trim()) && e.getBoundingClientRect().width>0); let box = el; for (let i=0;i<4 && box;i++) box = box.parentElement; const b = [...(box?.querySelectorAll("button")||[])].find(x => /close/i.test(x.getAttribute("aria-label")||"")); (b || box?.querySelector("button"))?.click(); }); await page.waitForTimeout(800);
log("sheet still open?", await sheetOpen());
log("visible controls after", await page.evaluate(() => [...document.querySelectorAll("button, input, [role=slider]")].filter(b => { const r=b.getBoundingClientRect(); return r.width>0 && r.top>=0 && r.top<844; }).map(b => (b.getAttribute("aria-label")||b.innerText||b.value||"").replace(/\s+/g," ").trim()).filter(Boolean)));
await page.screenshot({ path: "metro-on-page.jpg", type: "jpeg", quality: 50 });
log("bpm/tempo text in viewport", await page.evaluate(() => [...document.querySelectorAll("*")].filter(e => e.children.length===0 && e.getBoundingClientRect().width>0 && e.getBoundingClientRect().top>=0 && e.getBoundingClientRect().top<844).map(e => (e.textContent||"").trim()).filter(t => /bpm|tempo|tap|^\d{2,3}$/i.test(t))));
await browser.close();
