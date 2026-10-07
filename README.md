# UX / UI Review — [busk.town](https://busk.town)

**Focus:** musicians with **no tech background**, reading chords & lyrics on **phones and iPads** — at home rehearsing and live on stage.

**How it was tested:** logged-out browsing in Chrome emulating an iPhone (393×852) and iPad 11″ portrait (834×1194), plus DOM measurements. Reviewed pages: landing, dashboard/discovery, song chords page (รอ — มาช่า, and other songs), search, login. Reviewer: independent, not affiliated with busk.town. Single-reviewer sample — treat as feedback, not an audit.

---

## TL;DR

The **chord viewer core is genuinely good** — chords sit right above the lyrics syllable-by-syllable, sections are labeled, and the Tools panel (transpose, autoscroll, metronome, Easy chords, font size, layouts) is exactly what gigging musicians want.

The problems are **around** the viewer: on a phone, **ads + dialogs eat the first screen**, **chord lines get clipped off the right edge with no way to scroll to them**, **search misses obvious queries**, and **Thai text on screen (including core UI) looks misspelled/mis-encoded**. For a product whose promise is *"Chords You Can Trust"*, these break trust at the moment of performance.

---

## ✅ What's working — keep it

| Strength | Evidence |
|---|---|
| Chords aligned directly over lyric syllables, orange-on-dark, readable | `05-chords-lyrics-closeup.png` |
| Song facts up top: key, time signature, BPM, duration, era/genre tags, verified ✔ | `04-song-top-of-page.png` |
| Powerful, well-designed Tools sheet: font size, Full/Compact/Two Columns, Easy chords, Cb/E♯ vs B/F♯, metronome (+sound), key transposer, autoscroll | `06-tools-sheet.png`, `07-song-ipad.png` |
| Dark, high-contrast song view = stage-friendly; iPad toolbar shows labelled Key / Autoscroll / Metronome / Tools | `07-song-ipad.png` |
| Fast path to fixing errors: "press & hold a lyric to report", Request Song, Feedback Form in footer | `09-song-page-full.png` |
| Clean visual discovery: big genre tiles, decades, gig tags (Wedding/Christmas/Worship) | `12-dashboard-full.png` |
| LINE login fits the Thai audience; password show/hide toggle | `11-login-phone.png` |

---

## 🔧 Issues, prioritized

### P1 — Fix first

**1. Ads dominate the screen musicians actually use to play.**
On a phone, the top ad takes ~30–40% of the first screen *above the song title* (`03`, `04`); on iPad it pushes chords below the fold entirely (`07`). Below the song there's a second ad block (sometimes an empty black box), then two related-song lists, a chord grid, an FAQ, a video embed and a Shopee ad wall (`09`). Gigging musicians pay for this screen real estate.
**Suggest:** a "stage / performance mode" (or logged-in view) that hides ads inside the song body; collapse the top ad to a small banner; remove the empty-slot black box.

**2. Chord lines overflow the phone width and the last chord is unreachable.**
The 5-bar Pre-Hook line measures **384px wide inside a 353px container with no horizontal scrolling** — the final `| Bsus4 |` is cut off at the screen edge (`08`, visible at bottom of `05`). Musicians on stage can't swipe to a clipped chord.
**Suggest:** auto-wrap or auto-switch wide lines to Compact/Two Columns under ~420px. Chords must **never** be clipped.

**3. Thai text appears misspelled / mis-encoded — across UI *and* lyrics.**
Screenshots and the page source consistently show tone marks and vowels in the wrong order or added spuriously (e.g. the song title "รอ" rendering with an extra mai-ek; cookie banner "การใชคุกกี้"; login buttons "เขาสู่ระบบ / สมัครสมาชิกฟรี" all render distorted). If this is an encoding/transliteration artifact in the content pipeline rather than an intentional font style, it's a credibility problem for a lyrics product.
**Suggest:** audit the content pipeline (TIS-620↔Unicode conversion, NFC normalization) and have a native Thai speaker QA the UI strings and a sample of lyrics.

**4. Search misses songs that exist.**
Searching **`carabao`** — Thailand's most famous band, whose songs are literally listed under "Recently Added" on the same page — returns *"not found"* (`10`). Search appears to need exact displayed (Thai-script) text.
**Suggest:** match romanized/alternate artist & title spellings ("carabao" → คาราบาว), keep the (nice!) Google fallback, and show suggestions as the user types.

### P2 — Next

**5. First visit = dialog pile-up on the critical path.**
A full-width cookie modal covers the bottom third of the landing page (`01`), and on the song page an onboarding popover opens **over the first chords** until dismissed (`03`). Between a link and the song, a musician shouldn't meet two modals.
**Suggest:** non-blocking toasts; move the first-run tooltip so it points at the toolbar without covering content.

**6. Unlabelled / hidden controls on phone.**
The phone toolbar shows only an unlabelled sliders icon for Tools, and the **Metronome disappears entirely** (it's buried inside the Tools sheet) — while iPad shows it labelled. The iPad header is a row of unlabelled icons (megaphone, download, sun, hamburger).
**Suggest:** keep Metronome and Tools visible + labelled on phone; add labels or persistent tooltips to header icons.

**7. Cryptic vocabulary for non-technical musicians.**
"E (Ori)", "(+5)", "(−2)" and the chord type called "**True**" (vs Easy/Lyrics) require explanation.
**Suggest:** "Original key", "+5 semitones / capo-style hints", and rename True → "Original" or "Real chords".

**8. After the song, actions are buried under an SEO tail.**
"Back to top", setlist add, and next-song affordances aren't visible on mobile without scrolling through two related-song lists + FAQ + ads (`09`).
**Suggest:** sticky bottom bar on mobile (key, autoscroll, add-to-setlist, next song); collapse the SEO tail behind accordions.

### P3 — Polish

**9. Sign-up friction.** Username/password or LINE only — no *Continue with Apple / Google* on iPhone/iPad; "can't register? contact the team" is a dead-end for non-tech users (`11`).

**10. Landing page looks unfinished & misdirects.** Grey skeleton bars sit inside the animated chord marquee (`01`); the primary CTA says "Visit busk.town" while you're already on busk.town — make it "Search a song" or "Try it free". Landing is English while the app and audience are Thai — pick one language per context or offer a toggle.

**11. Surface the installable/offline app.** An "Install app" button exists only deep in the menu — for gigging musicians (flaky venue Wi-Fi) this deserves a banner on the dashboard and in the song page.

---

## 🙋 Top-8 quick wins

1. Hide/collapse ads inside the song view (stage mode).
2. Stop chord lines clipping at the right edge on phones.
3. Fix Thai text encoding in UI strings + lyrics (native QA).
4. Search: accept romanized artist names & show live suggestions.
5. Make first-run cookie/tooltip non-blocking.
6. Label phone controls; bring Metronome back to the phone toolbar.
7. Rename "E (Ori)" / "True" to plain words ("Original key", "Original chords").
8. Add "Continue with Apple" and surface "Install app" for offline use.

---

## Appendix — all screenshots

| # | File | Shows |
|---|---|---|
| 1 | `images/01-landing-phone.png` | Landing on iPhone: cookie modal, grey placeholder bars, CTA |
| 2 | `images/02-dashboard-phone.png` | Dashboard first screen (logged out) |
| 3 | `images/03-song-first-visit.png` | Song page first visit: ad + tooltip over chords |
| 4 | `images/04-song-top-of-page.png` | Song page top: ad, title card, phone toolbar |
| 5 | `images/05-chords-lyrics-closeup.png` | Chords-over-lyrics readability close-up |
| 6 | `images/06-tools-sheet.png` | Tools sheet: font, layouts, chord type, notation, metronome |
| 7 | `images/07-song-ipad.png` | iPad song view: labelled toolbar, big ad |
| 8 | `images/08-chord-line-overflow.png` | Chord/lyric lines running into the screen edge (phone) |
| 9 | `images/09-song-page-full.png` | Full song page: ads, related lists, chord grid, FAQ, ad wall |
| 10 | `images/10-search-no-results.png` | Search "carabao" → not found |
| 11 | `images/11-login-phone.png` | Login: password + LINE only |
| 12 | `images/12-dashboard-full.png` | Dashboard full: genre tiles, decades, tags, Shopee ad wall |

*Captured Oct 2026 on Chrome (iPhone/iPad emulation), logged-out state. Site content is in Thai.*
