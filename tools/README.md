# Tools

Scripts used to check the claims in the note and to make the pictures. All were run on 7 October and 9 November 2026 against the live site.

## verify/

Playwright scripts at phone width (390 x 844, 2x). Install once with `npm i playwright && npx playwright install chromium`, then run from this folder, for example `node verify/line-overflow.mjs`.

- `state.mjs` saves a `state.json` with the cookie banner and the tools tooltip dismissed. Run it first; the other scripts pick it up.
- `song-ad-key-capo.mjs` checks the ad position and its X, the key picker (no capo), the key surviving a reload, and the URL staying the same.
- `autoscroll-stop.mjs` shows that tapping the selected speed turns Autoscroll off and nothing else stops it.
- `line-overflow.mjs` measures how far chord and lyric lines run past the edge under each layout, chord type and font size.
- `artist-alias-search.mjs` runs the Thai and English artist names through the header search.
- `artist-page-back.mjs` sorts an artist page by Date Added, opens a song, and goes back.
- `metronome-tempo.mjs` turns the metronome on and looks for any tempo control.

Cloudflare may challenge a headless browser after a few runs. Space the runs out.

`x2-facade.png` and `x2-chart-verse1.png` are the phone screenshots the mockups are built on.

## images/

Pillow scripts, run with `uv run --with pillow python3 tools/images/<script>.py` from the repo root.

- `annotate.py` draws the orange outlines on the original screenshots.
- `annotate-lyrics.py` redraws the two lyric highlights so the outlines sit on lyric words only.
- `mockups.py` composes the picture-in-picture sketch and the annotated video box.
