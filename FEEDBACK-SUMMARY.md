Hi busk.town team,

Some honest feedback from a gigging musician who plays off his phone and iPad, mostly reading chords and lyrics. The song view itself is great — chords over the right syllables, labelled sections, and the tools menu (transpose, autoscroll, metronome, easy chords) is close to everything I'd want on stage. The problems are all around it. In the order I'd care about them:

1) Ads crowd out the song. On my phone an ad takes about 40% of the first screen before the title, and on the iPad the chords don't even start above the fold. Below the song there's a second ad (sometimes an empty black box) and then two related lists, an FAQ, a video and a Shopee wall — 12,000px of scroll for a four-minute song. A stage view without ads inside the song would mean a lot to players.

2) Chord lines get clipped. I measured a five-bar line that's 384px wide in a 353px container with nothing scrollable — the last chord was cut in half at the edge of the screen and I couldn't reach it. Long lines should wrap or go compact on narrow phones. Chords should never be cut off.

3) The Thai text renders misspelled in places — tone marks out of order or spurious extra marks, even in the login buttons and the cookie notice, and it's in the raw page text too. It reads like something in the text pipeline (encoding, TIS-620/Unicode conversion) is mangling it. For a lyrics product this is the one thing that makes players stop trusting the data. Please have a native speaker check the UI strings and a sample of lyrics.

4) Search didn't find "carabao" — with their songs right there on the dashboard. It seems to match only the exact Thai text. Romanised spellings should find the same songs. (The Google fallback is a nice touch, though.)

5) First visit: the cookie modal covers the landing page and the intro tooltip pops up over the first chords, so a song link doesn't open straight onto the song. Also on the phone, Tools is an unlabeled icon and the metronome hides inside it — on iPad both are labelled. "E (Ori)", "(+5)" and the chord type called "True" took me a beat to parse; "Original key", "+5 semitones" and "Original chords" say it plainly.

6) Smaller things: login is password-or-LINE with no Continue with Apple, and "can't register? contact the team" is a quiet sign-up killer; the landing's animated chords show grey skeleton bars; its main button says "Visit busk.town" while you're already there; and the "Install app" option (offline gigs, unreliable venue wifi!) is buried in the menu — please surface it.

Honestly, the viewer is close to the best I've played from on a phone. Fix the surroundings and I'll retire my printed setlist. Thanks for building it.

Full review with screenshots: https://github.com/Nacnano/busk-town-ux-review
