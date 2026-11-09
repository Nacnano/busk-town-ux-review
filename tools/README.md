# Tools

Verification and image-processing scripts retained from the October–November 2026 review. See [the reproduction notes](../TESTING.md) for the final review's limits. Having a script here does not mean it was successfully rerun during the final pass.

## Report integrity

Run `node tools/verify/report-integrity.mjs` from the repository root. It checks local Markdown/image links, the original capture hashes, the final publication hashes and whether every image used in the README is covered by the final manifest. It uses Node's built-in modules and does not open the live site or need an install.

## verify/

Playwright scripts at phone width (390 x 844, 2x). Install once with `npm i playwright && npx playwright install chromium`, then run from this folder, for example `node verify/line-overflow.mjs`.

- `state.mjs` saves a `state.json` with the cookie banner and the tools tooltip dismissed. Run it first; the other scripts pick it up.
- `song-ad-key-capo.mjs` checks the ad position and its X, the key picker (no capo), the key surviving a reload, and the URL staying the same.
- `autoscroll-stop.mjs` is the historical check of the selected-speed toggle and other attempted stopping actions. The Autoscroll recommendation has been removed from the published feedback.
- `line-overflow.mjs` measures how far chord and lyric lines run past the edge under each layout, chord type and font size.
- `artist-alias-search.mjs` runs the Thai and English artist names through the header search.
- `artist-page-back.mjs` sorts an artist page by Date Added, opens a song, and goes back.
- `metronome-tempo.mjs` turns the metronome on and looks for any tempo control.

Cloudflare may challenge a headless browser after a few runs. Space the runs out.

`x2-facade.png` and `x2-chart-verse1.png` are the phone screenshots the mockups are built on.

## images/

Pillow scripts, run with `uv run --with pillow python3 tools/images/<script>.py` from the repo root.

- `annotate.py` draws orange outlines on the original screenshots, including earlier highlights no longer used in the final note.
- `annotate-lyrics.py` redraws the two lyric highlights so the outlines sit on lyric words only. Run it after `annotate.py` when recreating the published highlights.
- `mockups.py` composes the picture-in-picture sketch and an earlier skip-control mockup. Only the picture-in-picture sketch is used in the final note. The historical `33-skip-comment.jpg` is not used as evidence.
