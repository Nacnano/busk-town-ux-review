import { phone, dismiss, SONG, log } from "./common.mjs";
const { browser, context, page } = await phone();
await page.goto(SONG, { waitUntil: "domcontentloaded" }); await page.waitForTimeout(2500);
log("fresh load, no dismiss", await page.evaluate(() => ({ scrollY: window.scrollY, h1Top: document.querySelector("h1")?.getBoundingClientRect().top, adLabelTop: [...document.querySelectorAll("*")].find(e => e.children.length===0 && /advertisement/i.test(e.textContent||""))?.getBoundingClientRect().top })));
await dismiss(page);
log("after dismiss", await page.evaluate(() => ({ scrollY: window.scrollY, h1Top: document.querySelector("h1")?.getBoundingClientRect().top })));
await page.evaluate(() => window.scrollTo(0,0)); await page.waitForTimeout(300);
// close ad with real click
const closeAd = page.getByRole("button", { name: "close ad" }).first();
log("close ad count", await closeAd.count());
await closeAd.click({ force: true }); await page.waitForTimeout(800);
log("after real close", await page.evaluate(() => ({ adLabel: !![...document.querySelectorAll("*")].find(e => e.children.length===0 && /advertisement/i.test(e.textContent||"")), h1Top: document.querySelector("h1")?.getBoundingClientRect().top, scrollY: window.scrollY })));
await page.reload({ waitUntil: "domcontentloaded" }); await page.waitForTimeout(2500); await page.evaluate(() => window.scrollTo(0,0)); await page.waitForTimeout(200);
log("after reload", await page.evaluate(() => ({ adLabel: !![...document.querySelectorAll("*")].find(e => e.children.length===0 && /advertisement/i.test(e.textContent||"")), h1Top: document.querySelector("h1")?.getBoundingClientRect().top })));
// Different song in same context: does ad show?
await page.goto("https://busk.town/songs/there-s-no-gettin-over-me", { waitUntil: "domcontentloaded" }); await page.waitForTimeout(2500); await page.evaluate(() => window.scrollTo(0,0));
log("other song ad", await page.evaluate(() => ({ adLabel: !![...document.querySelectorAll("*")].find(e => e.children.length===0 && /advertisement/i.test(e.textContent||"")), h1Top: document.querySelector("h1")?.getBoundingClientRect().top })));

// KEY MENU
await page.goto(SONG, { waitUntil: "domcontentloaded" }); await page.waitForTimeout(2000); await dismiss(page);
const before = await page.evaluate(() => [...document.querySelectorAll("button")].map(b => b.innerText.replace(/\s+/g," ").trim()));
await page.getByRole("button", { name: /\(Ori\)/ }).first().click(); await page.waitForTimeout(600);
const after = await page.evaluate(() => [...document.querySelectorAll("button, [role=option], [role=menuitem], li")].map(b => ({ t: b.innerText.replace(/\s+/g," ").trim().slice(0,40), vis: b.getBoundingClientRect().width > 0 })).filter(b => b.t && b.vis));
log("visible controls with key menu open", after.map(a => a.t));
log("key menu region text", await page.evaluate(() => { const els = [...document.querySelectorAll("div")].filter(d => d.getBoundingClientRect().width>0 && /Ori/.test(d.innerText) && d.innerText.length < 400); const d = els.sort((a,b)=>a.innerText.length-b.innerText.length)[0]; return d ? d.innerText.replace(/\n+/g," | ") : "nf"; }));
// screenshot key menu
await page.screenshot({ path: "key-menu.jpg", type: "jpeg", quality: 60 });
// pick C via text match
const copt = page.locator("button, [role=option], [role=menuitem], li").filter({ hasText: /^C$|^C \(|^C\(/ }).first();
log("C option count", await copt.count());
if (await copt.count()) { await copt.click(); await page.waitForTimeout(600); }
log("after pick C: url + label", { url: page.url(), label: await page.evaluate(() => [...document.querySelectorAll("button")].map(b=>b.innerText.replace(/\s+/g," ").trim()).find(t=>/\(Ori\)|\([+-]\d+\)/.test(t))), ls: await page.evaluate(() => Object.entries(localStorage).filter(([k])=>/key|song|transpose/i.test(k)).map(([k,v])=>k+"="+v.slice(0,120))) });
await page.reload({ waitUntil: "domcontentloaded" }); await page.waitForTimeout(2200);
log("label after reload", await page.evaluate(() => [...document.querySelectorAll("button")].map(b=>b.innerText.replace(/\s+/g," ").trim()).find(t=>/\(Ori\)|\([+-]\d+\)/.test(t))));
// Does a new context (another phone) get Ori? (yes presumably). Check URL has no key param: already.

// METRONOME: toggle on, see toolbar
await page.getByRole("button", { name: /show more tools/i }).first().click(); await page.waitForTimeout(500);
await page.getByRole("switch").nth(1).click().catch(()=>{}); await page.waitForTimeout(500);
log("switches", await page.evaluate(() => [...document.querySelectorAll("[role=switch]")].map(s => ({ label: s.getAttribute("aria-label") || s.parentElement?.innerText.replace(/\s+/g," ").trim().slice(0,40), checked: s.getAttribute("aria-checked") }))));
await page.screenshot({ path: "tools-metro.jpg", type: "jpeg", quality: 60 });
// close the sheet (click X: "close" button in sheet)
const closeSheet = page.getByRole("button", { name: /close/i }).filter({ hasNot: page.locator("text=ad") }).last();
await page.keyboard.press("Escape"); await page.waitForTimeout(300);
await page.evaluate(() => { const b = [...document.querySelectorAll("button")].find(x => /close (tools|sheet|dialog|modal)/i.test(x.getAttribute("aria-label")||"")); b?.click(); }); await page.waitForTimeout(500);
log("toolbar after metronome on", await page.evaluate(() => [...document.querySelectorAll("button")].filter(b => { const r=b.getBoundingClientRect(); return r.width>0 && r.top>=0 && r.top<400; }).map(b => (b.getAttribute("aria-label")||b.innerText).replace(/\s+/g," ").trim())));
log("bpm-ish text visible", await page.evaluate(() => [...document.querySelectorAll("button, input, [role=slider], span")].filter(e => { const r=e.getBoundingClientRect(); return r.width>0 && r.top>=0 && r.top<300 && e.children.length < 3; }).map(e => (e.getAttribute("aria-label")||e.innerText||e.value||"").replace(/\s+/g," ").trim()).filter(t => /\d{2,3}|bpm|tempo|tap/i.test(t))));
await page.screenshot({ path: "metro-on.jpg", type: "jpeg", quality: 60 });
await browser.close();
