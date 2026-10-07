# Reproduction notes

The published README was later shortened. Steps below still cover the checks that were left out of the feedback (tool labels, chord diagrams, empty artist search, setlists, sign-up, install). Those notes are here so the evidence stays, not because each one is still a recommendation.

Rechecked on 7 October 2026 by two agents and the primary reviewer in separate logged-out Chrome tabs. The primary reviewer also inspected the replacement images against their captions. Phone captures are 393 × 852 for song controls and 390 × 844 for search; portrait tablet captures are 768 × 1024. Saved JPEG dimensions were checked against the page viewport. Captures are unannotated and unmodified.

These are simulated desktop-browser layouts. Physical touch gestures, iPhone/iPad Safari, account-only features, metronome audio, completed installation and disconnected-network behavior were not tested. No credentials were entered or accounts created. The first-visit introduction image is explicitly archival.

See [SCREENSHOT-CHECK.md](SCREENSHOT-CHECK.md) for the claim-by-claim audit and [capture metadata](evidence/2026-10-07-recheck.json) for URLs, settings and actions. Dynamic findings below were checked through interaction; screenshots show the resulting states.

## Reading and playing controls

Song: [รอ — มาช่า วัฒนพานิช](https://busk.town/songs/%E0%B8%A3%E0%B8%AD-masha). Unless noted, use original key E, Full layout, True chords, default font size, Section name on, metronome off and Autoscroll off at 393 × 852.

- **1.1 Song space:** open the song at the top. Fresh performance image 01 shows a large ad above the title and music. The returning profile no longer displays the introduction. Earlier image 03 visibly shows the same song with the first-visit introduction over opening chords; it is retained only with that qualification.
- **1.2 Long line:** scroll to the first Pre-Hook, around scrollY 511. The last Bsus4 is partly outside the initial view (performance 05). Scroll horizontally over the music; the outer scrolling container moves 10.5px and reveals the chord (06). The row was 384px wide inside a 353px area; its surrounding scroll container was 404px wide in a 393px viewport. Checking only the row or window misses the working outer container. This supports fitting the line automatically, not a claim that the chord is unreachable.
- **1.3 Section overlap:** select Bridge in the section picker; let the jump settle, then scroll up about 72px to scrollY 1106. Performance 07 shows the last Verse 2 chord and lyric beneath the picker. The picker spans y76–104; the chord spans y77.02–90.22 and the lyric y90.22–110.62.
- **2.1 Autoscroll:** at that reading position, capture the stopped state (08), click Autoscroll (09), then click the highlighted 100% (10). Percentages replace the label while running; there is no visible Pause label. The selected percentage does pause: the Autoscroll label returns and scrollY stays at 1166 across subsequent reads. A different percentage changes the speed.
- **2.2 Tool labels:** performance 01 shows the phone slider icon without visible “Tools” text and “E (Ori)”. Clicking it opens the sheet in 02, with True/Easy labels. The claim is about wording. Clicking Section name turns it off and hides headings in Full/True (03), and also works in Full/Easy (04). The earlier disabled-control criticism is withdrawn.
- **2.3 Fingering:** at scrollY 1166, capture F#m7 before tapping (11), then click the visible chord at x44/y116 (12). No diagram appears and the reading position stays unchanged. Scroll to the existing guitar guide (13), around scrollY 3892.5; F#m7 is in the third row on the right. Both captures retain original key E and the same display settings. The guide heading is about 2842px below the reading position. This is a proposed convenience, not a failed existing chord button.

## Search and returning to a list

- **3.1 Artist aliases:** on the [dashboard](https://busk.town/dashboard), open the header search. `carabao` returns no matches (journeys 01); replacing it with `คาราบาว` returns an artist and five song suggestions (02). `นิวจิ๋ว` returns no matches (03); `NEW JIEW` returns an artist and songs (04). All four captures use only the main search, without an artist-local search open underneath.
- **3.2 Empty artist search:** open [NEW JIEW](https://busk.town/artists/new-jiew), expand the local song search and enter `hotel california`. Once filtering settles, the song area is empty and affiliate products follow, without a no-results message or a search-all-songs action (journeys 05). This does not establish whether that song exists elsewhere on the site.
- **3.3 Back navigation:** in the same local search enter `ไม่รัก`, select Date Added and capture the resulting `ไม่รักไม่ต้อง` row (06). Open it, then use browser Back. The query collapses/clears, Title is selected and the full catalog returns (07). The new before image includes the actual selected sort. List-position preservation is suggested, but was not independently tested.

## Setlists, joining and installation information

- **3.4 Setlist entry:** open [About Us](https://busk.town/about-us). Parent 01 captures the Free Plan promotion for organised setlists and sharing. Scroll to the Join Us invitation (02), click its own “Visit busk.town” link and record the immediate destination (03): `/dashboard`. That capture retains a lower scroll position. Parent 06 shows the same resulting dashboard brought to the top for readable context; it is not presented as the untouched landing position. The inspected guest menu (04) and song tools do not explain the first setlist step. No conclusion is drawn about the logged-in setlist workflow.
- **4.1 Sign up:** open the guest menu (parent 04) and click its Sign up button. It opens `/login` with a Thai welcome-back heading, username/password fields and LINE options below (05). Both menu links point to `/login`. Registration through LINE is present; the proposal asks for a clearer new-account heading and explanation, not another login provider. No form was submitted.
- **4.2 Internet expectations:** parent 04 shows “Install app” without saying whether installation saves songs. This is an information proposal. No app installation or offline behavior is claimed to be broken.

## What changed after the evidence audit

- The former `08-chord-line-overflow.png` showed ยอมรับ by Black Head, not รอ. It also did not clearly show the described clipping. It is now [archived under an accurate name](images/archive/08-yom-rub-archival.png), and fresh performance 05–06 replace it.
- Horizontal scrolling works. The earlier “unreachable/no horizontal scroll” conclusion was wrong and is withdrawn.
- Section name works when clicked. Disabled-looking markup was insufficient evidence of a failed control. The old tools image is [archived](images/archive/27-tablet-tools-archival.jpg); disabled-control and Reset criticisms have been removed from the proposals.
- The old Em7 song image used key D, while its guide used E and did not show Em7. Fresh F#m7 images use the same original key and settings throughout.
- The old Back-navigation before image showed Title, despite a Date Added claim. Fresh journeys 06 captures the actual pre-navigation sort.
- The setlist promotion alone did not demonstrate the invitation’s destination. The new invitation and actual dashboard captures document the click. Sign up likewise has a fresh menu-to-destination pair.
- The earlier Thai encoding diagnosis remains withdrawn. The earlier live-search, typo-tolerance and saved-key checks do not justify a broader search defect; this report focuses on the reproduced aliases.

Browser-extension blocking interrupted one agent’s final About/sign-up pass. The primary reviewer completed those interactions and captures afterward. Song settings were restored, and temporary viewports were reset or removed with their review tabs.
