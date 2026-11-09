from PIL import Image, ImageDraw
from pathlib import Path

root = Path(__file__).resolve().parents[2] / "images"
out = root / "highlights"
out.mkdir(exist_ok=True)

ORANGE = (255, 138, 48)
FILL = (255, 138, 48, 42)


def lum(p):
    return 0.2126 * p[0] + 0.7152 * p[1] + 0.0722 * p[2]


def rounded(base, boxes, radius, stroke):
    im = base.convert("RGBA")
    overlay = Image.new("RGBA", im.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for box in boxes:
        x0, y0, x1, y1 = box
        draw.rounded_rectangle([x0, y0, x1, y1], radius=radius, fill=FILL, outline=ORANGE, width=stroke)
    im = Image.alpha_composite(im, overlay)
    return im.convert("RGB")


def save(name, im):
    path = out / name
    im.save(path, quality=86)
    print(path.name, im.size)


def right_edge_bands(path, margin, min_hits, min_height):
    im = Image.open(path).convert("RGB")
    px = im.load()
    w, h = im.size
    rows = []
    for y in range(h):
        hits = 0
        for x in range(w - margin, w - 2):
            if lum(px[x, y]) > 95:
                hits += 1
        if hits >= min_hits:
            rows.append(y)
    bands = []
    if not rows:
        return im, bands
    start = prev = rows[0]
    for y in rows[1:]:
        if y <= prev + 3:
            prev = y
        else:
            if prev - start >= min_height:
                bands.append((start, prev))
            start = prev = y
    if prev - start >= min_height:
        bands.append((start, prev))
    return im, bands


def merge(bands, gap):
    if not bands:
        return []
    merged = [list(bands[0])]
    for a, b in bands[1:]:
        if a - merged[-1][1] <= gap:
            merged[-1][1] = b
        else:
            merged.append([a, b])
    return merged


# Ad
im = Image.open(root / "recheck-performance-01-phone-song-top.jpg")
save("01-ad.jpg", rounded(im, [(14, 64, 378, 252)], 16, 4))

# Cut chord ends on both Pre-Hooks
im = Image.open(root / "recheck-performance-05-masha-default-clipped-prehook.jpg")
save(
    "02-chord.jpg",
    rounded(im, [(300, 310, 388, 346), (300, 752, 388, 788)], 10, 3),
)

# Lyrics, phone @2x
for src, dest in [
    ("lyric-no-gettin-over-me.jpg", "03-lyrics-en.jpg"),
    ("lyric-kunjae.jpg", "04-lyrics-th.jpg"),
]:
    im, bands = right_edge_bands(root / src, margin=18, min_hits=4, min_height=8)
    bands = merge(bands, 22)
    w, h = im.size
    boxes = []
    for y0, y1 in bands:
        boxes.append((w - 168, max(4, y0 - 12), w - 8, min(h - 4, y1 + 12)))
    print(dest, "boxes", len(boxes), bands)
    save(dest, rounded(im, boxes, 14, 6))

# Bridge menu over the chord
im = Image.open(root / "recheck-performance-07-section-picker-overlap.jpg")
save("05-bridge.jpg", rounded(im, [(268, 66, 388, 128)], 12, 3))

# Autoscroll speeds
im = Image.open(root / "recheck-performance-09-autoscroll-active.jpg")
save("06-autoscroll.jpg", rounded(im, [(148, 14, 322, 70)], 12, 3))

# Search pairs
pairs = {
    "07-carabao-empty.jpg": ("recheck-journeys-01-carabao-alias-fails.jpg", [(46, 2, 338, 132)]),
    "08-carabao-found.jpg": ("recheck-journeys-02-carabao-canonical-works.jpg", [(36, 2, 334, 468)]),
    "09-newjiew-empty.jpg": ("recheck-journeys-03-newjiew-thai-alias-fails.jpg", [(46, 2, 338, 132)]),
    "10-newjiew-found.jpg": ("recheck-journeys-04-newjiew-canonical-works.jpg", [(36, 2, 334, 468)]),
    "11-search-kept.jpg": ("recheck-journeys-06-before-song-query-and-date-added.jpg", [(12, 240, 378, 340)]),
    "12-search-lost.jpg": ("recheck-journeys-07-after-back-query-lost-title-sort.jpg", [(12, 242, 378, 298)]),
}
for dest, (src, boxes) in pairs.items():
    im = Image.open(root / src)
    save(dest, rounded(im, boxes, 12, 3))
