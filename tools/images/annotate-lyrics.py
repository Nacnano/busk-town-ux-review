from PIL import Image, ImageDraw
from pathlib import Path
root = Path(__file__).resolve().parents[2] / "images"
out = root / "highlights"
ORANGE = (255, 138, 48); FILL = (255, 138, 48, 42)

def rounded(base, boxes, radius, stroke):
    im = base.convert("RGBA"); overlay = Image.new("RGBA", im.size, (0, 0, 0, 0)); d = ImageDraw.Draw(overlay)
    for b in boxes: d.rounded_rectangle(list(b), radius=radius, fill=FILL, outline=ORANGE, width=stroke)
    return Image.alpha_composite(im, overlay).convert("RGB")

def lyric_bands(path, margin, min_hits, min_height, skip_top):
    # count near-white (lyric) pixels only; orange chord text is excluded by requiring b > 170
    im = Image.open(path).convert("RGB"); px = im.load(); w, h = im.size; rows = []
    for y in range(skip_top, h):
        hits = sum(1 for x in range(w - margin, w - 2) if px[x, y][0] > 170 and px[x, y][1] > 170 and px[x, y][2] > 170)
        if hits >= min_hits: rows.append(y)
    bands = []
    if rows:
        s = p = rows[0]
        for y in rows[1:]:
            if y <= p + 3: p = y
            else:
                if p - s >= min_height: bands.append((s, p))
                s = p = y
        if p - s >= min_height: bands.append((s, p))
    return im, bands

for src, dest, skip in [("lyric-no-gettin-over-me.jpg", "03-lyrics-en.jpg", 150), ("lyric-kunjae.jpg", "04-lyrics-th.jpg", 180)]:
    im, bands = lyric_bands(root / src, margin=18, min_hits=3, min_height=8, skip_top=skip)
    w, h = im.size
    boxes = [(w - 168, y0 - 10, w - 8, y1 + 10) for y0, y1 in bands]
    print(dest, len(boxes), bands)
    rounded(im, boxes, 14, 6).save(out / dest, quality=86)
