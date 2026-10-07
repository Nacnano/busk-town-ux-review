# How the additional review was checked

Date: 7 October 2026. Three independent agents explored separate logged-out Chrome tabs, using musician scenarios. Phone layouts were 390 × 844 and 393 × 852; the tablet layout was 768 × 1024. Dimensions were checked in the page. Screenshots were visually inspected before inclusion.

This is an evaluator review, not participant research. It does not establish behavior on physical phones, iPads or Safari. It does not test an account, metronome sound, completed app installation or a disconnected network.

## Song reading and controls

Song: [รอ — มาช่า วัฒนพานิช](https://busk.town/songs/%E0%B8%A3%E0%B8%AD-masha).

- **Section picker overlap (README 1.3):** use original key E, Full layout, True chords and default text size at 393 × 852. Scroll to the end of Verse 2, around scroll position 1106px. The floating Bridge picker covers the final G#m7 and lyric. Its rectangle was x290.45–373, y76–104; the chord and lyric occupied the same vertical range. Evidence: image 13.
- **Autoscroll pause (2.1):** start Autoscroll. A different percentage changes speed; tapping the selected percentage pauses and restores the Autoscroll label. There is no visible Pause label in the running state. Evidence: image 14.
- **Disabled switches (2.2):** inspect Tools in Full layout. Section name was reported disabled by the page, although it looked like an ordinary switch. Metronome sound and Show unverified songs were also disabled in inspected states. No cause is asserted. Evidence: image 27; disabled-state observations came from the page’s controls.
- **Reset wording (2.2):** change to key D, select Easy and enable the metronome; use Tools Reset. True chords returned, while D and the metronome remained. This supports clarifying the reset’s scope, not a claim that Reset is broken.
- **Chord shapes (2.3):** tap Em7 while reading the Pre-Hook. No diagram appeared. An existing chord guide was found roughly 2,860px below that reading position. The section picker can help return, so this is a convenience proposal. Evidence: images 15–16. They use different keys and demonstrate the two locations, not identical fingering before and after a tap.

## Search and navigation

- **Aliases (3.1):** in header search, `carabao` gave no matches; `คาราบาว` gave an artist link and five song suggestions. Searching `นิวจิ๋ว` gave no matches while the open song credited NEW JIEW, whose linked catalog contained songs. Evidence: images 17, 21–22.
- **Artist search recovery (3.2):** visit [NEW JIEW](https://busk.town/artists/new-jiew), expand its local search and type `hotel california`. Once filtering settles, the list is empty, without a no-results message or global-search action; affiliate products follow. Evidence: image 18. This is a search-scope/empty-state issue, not proof that Hotel California is missing from the whole site.
- **Back loses search (3.3):** on that artist page, search `ไม่รัก`, choose Date Added, open `ไม่รักไม่ต้อง`, then use browser Back. The query clears and sorting returns to Title. Images 19–20 show the query/list change; the before screenshot predates changing the sort, whose change was verified separately in the page.

## Setlists and joining

- **Setlist entry point (3.4):** [About Us](https://busk.town/about-us) promotes a Free Plan with organised setlists and sharing. Its Get started/Join invitation links to `/dashboard`, verified from the link and destination after clicking. The inspected guest menu and song tools do not explain how to start a setlist. Evidence: images 24, 26 and 28. Image 28 shows the invitation before clicking, not the destination. The logged-in workflow is untested.
- **Sign up destination (4.1):** open the song’s guest menu, then Sign up. Both Log in and Sign up point to `/login`. The destination has a welcome-back heading, existing-username fields and a LINE continuation route. No credentials were entered or account created. Evidence: images 24–25.
- **Internet expectations (4.2):** the inspected menu offers Install app; the inspected song, preferences and About content did not explain whether songs would be saved offline. An install attempt produced no confirmed outcome, so no installation defect or offline guarantee is asserted. This proposal asks for clear readiness information. Evidence: image 24.

## Corrections to the earlier review

- The Thai encoding diagnosis was not supported by visual rechecks and has been removed. No content-pipeline cause was established.
- Search is not exact-match only: `กลัวความไกล้` correctly suggested `กลัวความใกล้`. Suggestions appear while typing. Evidence: image 23.
- Changed key and Easy settings survived reload. A toast explained the saved song key.
- The song toolbar remained sticky. Enabling the metronome added a visible orange indicator; audio was not assessed.
- Installation does not establish offline availability.

## Evidence limits

Images 01–12 and the original chord-width measurement came from the earlier session. Image 13 freshly shows the section overlap and a line extending past the phone edge, but the old 384px/353px measurement was not repeated. The report therefore keeps the earlier clipping screenshot and omits a fresh numerical claim.

The agents shared browser preferences. Unexplained changes from another tab were excluded; the performance reviewer explicitly set and restored song settings for its main checks. Browser-extension blocking interrupted the final tablet recheck and installation follow-up.

No deterministic design detector results are claimed: the URL target had no local source scan, and the browser API allowed only read-only evaluation, so detector injection was unavailable. Findings come from manual interaction, visible page observations and screenshots.
