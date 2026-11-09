import { phone, SONG, log } from "./common.mjs";
const { browser, page } = await phone();
const measure = () => page.evaluate(() => {
  const lines = [...document.querySelectorAll("span.ll")];
  const chords = [...document.querySelectorAll("span")].filter(e => !e.classList.contains("ll") && /\|.*\|/.test(e.innerText||"") && e.children.length < 40 && e.getBoundingClientRect().height < 40);
  const over = (els) => { let n=0, max=0, sample=null; for (const el of els) { const r = el.getBoundingClientRect(); const past = Math.round(r.left + el.scrollWidth - window.innerWidth); if (past > 2) { n++; if (past>max) { max=past; sample=el.innerText.replace(/\s+/g," ").slice(0,50); } } } return { n, max, sample }; };
  return { ll: lines.length, lyric: over(lines), chord: over(chords), fs: lines[0] ? getComputedStyle(lines[0]).fontSize : null, ws: lines[0] ? getComputedStyle(lines[0]).whiteSpace : null, layout: localStorage.getItem("busk.config.v2.layout-mode"), content: localStorage.getItem("busk.config.v2.content-mode"), fsCfg: localStorage.getItem("busk.config.v2.font-size") };
});
const sheetOpen = () => page.evaluate(() => !![...document.querySelectorAll("*")].find(e => e.children.length===0 && /^Font size$/.test((e.textContent||"").trim()) && e.getBoundingClientRect().width>0));
const openTools = async () => { for (let i=0;i<3 && !(await sheetOpen());i++) { await page.getByRole("button", { name: /show more tools/i }).first().click({ force: true }); await page.waitForTimeout(700); } };
const pick = async (label) => { await openTools(); await page.getByText(new RegExp(`^${label}$`)).first().click({ force: true }); await page.waitForTimeout(700); };
const fontBtn = async (idx) => { await openTools(); await page.evaluate((idx) => { const el = [...document.querySelectorAll("*")].find(e => e.children.length===0 && /^Font size$/.test((e.textContent||"").trim())); let row = el; for (let i=0;i<3;i++){ row = row.parentElement; const b = row.querySelectorAll("button"); if (b.length>=2) { b[idx].click(); return; } } }, idx); await page.waitForTimeout(500); };
for (const url of ["https://busk.town/songs/there-s-no-gettin-over-me", "https://busk.town/songs/%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%9A%E0%B9%83%E0%B8%88%E0%B9%83%E0%B8%AA%E0%B9%88-%E0%B8%81%E0%B8%B8%E0%B8%8D%E0%B9%81%E0%B8%88"]) {
  await page.goto(url, { waitUntil: "domcontentloaded" }); await page.waitForTimeout(2500);
  if (/E0%B8%81%E0%B8%B8/.test(url)) log("kunjae line with อยากจะฟังนัก", await page.evaluate(() => [...document.querySelectorAll("span.ll")].map(e=>e.innerText.replace(/\s+/g," ").trim()).filter(t=>/อยากจะฟังนัก/.test(t)).slice(0,1)));
  console.log("\n==== " + decodeURIComponent(url).slice(-26));
  log("default", await measure());
  await pick("Compact"); log("Compact", await measure());
  await pick("Two Columns"); log("Two Columns", await measure());
  await pick("Full");
  await pick("Lyrics"); log("Lyrics only", await measure());
  await pick("Easy"); log("Easy chords", await measure());
  await pick("True");
  await fontBtn(0); log("font -1", await measure());
  await fontBtn(0); log("font -2", await measure());
  await fontBtn(1); await fontBtn(1); await fontBtn(1); log("font +1", await measure());
  await openTools(); await page.getByRole("button", { name: /^reset$/i }).first().click({ force: true }).catch(()=>{}); await page.waitForTimeout(500);
  log("after reset", await measure());
  await page.keyboard.press("Escape");
}
await browser.close();
