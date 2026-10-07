# Screenshot-to-claim audit

The published feedback in README.md was shortened after this audit, then rewritten in a warmer voice. It keeps the ad, wide chord lines, long lyrics past the phone edge, the section menu, Autoscroll pause, artist spellings, and search lost on Back. Lyric examples added on 7 October 2026: (There's) No Gettin' Over Me and (เก็บใจใส่) กุญแจ, at the default text size in a 390px-wide window. Sideways scrolling on the chart container reveals the rest of those lines. Tool wording, a chord-diagram popup, the empty artist search, setlists, sign-up, and offline install were left out: they were small, already explained on the page, or never actually tried.

Rechecked on 7 October 2026. The earlier report had evidence mismatches and two incorrect conclusions. The README uses fresh images for the findings it still includes.

The table separates what is visible from what needed an actual click or navigation. [Reproduction notes](TESTING.md) give the steps; the [capture manifest](evidence/2026-10-07-recheck.json) records exact URLs, viewports, settings, actions and image hashes. “Performance”, “journeys” and “parent” below correspond to the image filename prefixes.

| README point | Matching evidence | Result and limits |
|---|---|---|
| 1.1 Song space | [Fresh ad](images/recheck-performance-01-phone-song-top.jpg); [earlier introduction](images/03-song-first-visit.png) | Ad freshly confirmed. The introduction is visible in the earlier capture, but did not reappear in the returning profile. |
| 1.2 Wide line | [Initial](images/recheck-performance-05-masha-default-clipped-prehook.jpg) → [after sideways scrolling](images/recheck-performance-06-prehook-after-horizontal-scroll.jpg) | Same song, key and display settings. The final Bsus4 becomes readable. Withdrawn: “unreachable” and “no horizontal scroll”. Physical swipe behavior was not tested. |
| 1.3 Section overlap | [Picker over music](images/recheck-performance-07-section-picker-overlap.jpg) | Visible overlap freshly reproduced; picker and chord/lyric bounds also intersect. |
| 2.1 Pause wording | [Before](images/recheck-performance-08-autoscroll-before.jpg) → [running](images/recheck-performance-09-autoscroll-active.jpg) → [paused](images/recheck-performance-10-autoscroll-paused.jpg) | Active view has speed choices without a Pause label. Clicking the selected speed stops movement; that action was checked live. |
| 2.2 Tool wording | [Toolbar](images/recheck-performance-01-phone-song-top.jpg) → [Tools](images/recheck-performance-02-phone-tools-full.jpg) | Visible icon-only control, Ori and True labels. Withdrawn: non-working Section name switch. [After switching off](images/recheck-performance-03-section-switch-works-off.jpg) and [Full/Easy check](images/recheck-performance-04-section-switch-easy-works.jpg) record that it works. |
| 2.3 Fingering | [Before tap](images/recheck-performance-11-fsharpminor7-before-tap.jpg) → [after tap](images/recheck-performance-12-fsharpminor7-after-tap.jpg); [guide](images/recheck-performance-13-fsharpminor7-guide-same-key.jpg) | Same original E and F#m7 throughout. Live click produced no preview; existing F#m7 diagram is visibly farther down. Convenience proposal. |
| 3.1 Artist aliases | [carabao](images/recheck-journeys-01-carabao-alias-fails.jpg) / [คาราบาว](images/recheck-journeys-02-carabao-canonical-works.jpg); [นิวจิ๋ว](images/recheck-journeys-03-newjiew-thai-alias-fails.jpg) / [NEW JIEW](images/recheck-journeys-04-newjiew-canonical-works.jpg) | Each failed query has a successful comparison in the same dashboard search. No mixed global/local search context. |
| 3.2 Empty artist search | [Settled empty state](images/recheck-journeys-05-artist-scoped-empty.jpg) | Local query and blank song area visible. Settled page checked for absent recovery wording. No claim about the whole catalog. |
| 3.3 Browser Back | [Query + Date Added](images/recheck-journeys-06-before-song-query-and-date-added.jpg) → [cleared query + Title](images/recheck-journeys-07-after-back-query-lost-title-sort.jpg) | Exact open-song/Back action checked. Both query and sort loss shown. List-position loss is not claimed. |
| 3.4 First setlist | [Promotion](images/recheck-parent-01-about-setlist-promise.jpg); [invitation](images/recheck-parent-02-about-join-invitation.jpg) → [immediate dashboard](images/recheck-parent-03-invitation-opens-dashboard.jpg); [dashboard top](images/recheck-parent-06-invitation-dashboard-top.jpg) | Actual invitation click reaches `/dashboard`. README destination image is explicitly scrolled to top for context. Guest workflow only. |
| 4.1 Sign up | [Actual guest menu](images/recheck-parent-04-guest-menu-before-signup.jpg) → [actual destination](images/recheck-parent-05-signup-actual-login-destination.jpg) | Sign up click freshly reproduced. Welcome-back form and LINE registration both visible. No account created. |
| 4.2 Installation information | [Guest menu](images/recheck-parent-04-guest-menu-before-signup.jpg) | Install app label visible without an offline explanation. Information proposal only; installation and offline operation untested. |

## Replaced evidence

- **Wrong song:** former image 08 showed ยอมรับ, not รอ. It is retained only as [an archival capture](images/archive/08-yom-rub-archival.png), not clipping evidence.
- **Switch appearance:** former image 27 could not prove a failed switch. It is retained only as [an archival Tools view](images/archive/27-tablet-tools-archival.jpg).
- **Mixed chord keys:** old images 15–16 showed different keys and different chord examples. Fresh F#m7 captures replace them.
- **Sort mismatch:** old image 19 was captured before choosing Date Added. The replacement records the actual before/after settings.
- **Incomplete journeys:** the earlier setlist promotion could not establish where its invitation led. Fresh consecutive captures now show the invitation and destination; the same approach was used for Sign up.

Other earlier images remain in the repository as historical material. They are not used to substantiate the revised README. No participant interviews, physical-device behavior, account-only features, offline support or audio outcomes are established by these captures.
