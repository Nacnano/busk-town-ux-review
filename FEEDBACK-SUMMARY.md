Feedback for the busk.town team — UX review from a musician's point of view
(phone/iPad users reading chords & lyrics; full report with screenshots: https://github.com/Nacnano/busk-town-ux-review)

Top fixes, in order:

1) Ads take over the playing screen. On phones the top ad eats ~40% of the first
   screen above the song, on iPad it pushes chords off-screen, and there are empty
   black ad boxes below the song. Please add an ad-free "stage mode" for the song
   view.

2) Chord lines get clipped on phones: our test song's 5-bar line is 384px wide in a
   353px container with no horizontal scroll — the last chord is cut off and
   unreachable. Please auto-wrap wide lines on small screens.

3) Thai text renders with wrong/displaced tone marks across UI and lyrics
   (login buttons, cookie banner, even song titles). This hurts a "chords you can
   trust" product — please audit the text-encoding pipeline with native QA.

4) Search doesn't find "carabao" (songs by คาราบาว exist). Please match romanized
   names and show live suggestions.

5) First visit shows a cookie modal + an onboarding popover covering the first
   chords — please make both non-blocking.

6) Phone toolbar hides controls: the Tools button is an unlabelled icon and
   Metronome only exists inside the Tools sheet. Keep them visible & labelled.

7) Rename cryptic labels: "E (Ori)" → "Original key", chord type "True" →
   "Original chords".

Nice-to-haves: Continue with Apple/Google on login, a sticky bottom bar (key /
autoscroll / add to setlist), and an obvious "Install app" prompt for offline gigs.

Keep up the great work — the core viewer is close to best-in-class!
