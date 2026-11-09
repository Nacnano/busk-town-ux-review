from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]
V = str(ROOT / "tools" / "verify") + "/"
OUT = str(ROOT / "images") + "/"
ORANGE = (232, 116, 47); PAGE = (22, 22, 22); BTN = (28, 28, 28); BORDER = (58, 58, 58)
bold = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 26, index=1)
reg = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 30, index=0)

facade = Image.open(V + "x2-facade.png").convert("RGB")
video = facade.crop((40, 647, 740, 1041))          # the video box, 700x394

def rounded_mask(size, r):
    m = Image.new("L", size, 0); ImageDraw.Draw(m).rounded_rectangle([0, 0, size[0]-1, size[1]-1], radius=r, fill=255); return m

def label(draw, xy, text):
    x, y = xy; w = draw.textlength(text, font=bold)
    draw.rounded_rectangle([x, y, x + w + 28, y + 44], radius=12, fill=ORANGE)
    draw.text((x + 14, y + 8), text, font=bold, fill=(20, 20, 20))

# 1) picture-in-picture: small video over the Verse 1 chart
chart = Image.open(V + "x2-chart-verse1.png").convert("RGBA")
mini = video.resize((320, 180), Image.LANCZOS)
mw, mh = mini.size; x = chart.width - mw - 28; y = chart.height - mh - 150
shadow = Image.new("RGBA", chart.size, (0, 0, 0, 0))
ImageDraw.Draw(shadow).rounded_rectangle([x - 6, y + 6, x + mw + 6, y + mh + 18], radius=18, fill=(0, 0, 0, 160))
shadow = shadow.filter(ImageFilter.GaussianBlur(10)); chart = Image.alpha_composite(chart, shadow)
chart.paste(mini, (x, y), rounded_mask(mini.size, 16))
d = ImageDraw.Draw(chart)
d.rounded_rectangle([x - 10, y - 10, x + mw + 10, y + mh + 10], radius=22, outline=ORANGE, width=6)
label(d, (x - 10, y - 66), "Proposed: video stays here")
chart.convert("RGB").save(OUT + "32-pip-mockup.jpg", quality=86); print("32", chart.size)

# 2) skip back: the video box with a proposed control row beneath it
pad = 40; row_h = 96; gap = 28
canvas = Image.new("RGB", (780, pad + video.height + gap + row_h + 70 + pad), PAGE)
canvas.paste(video, (40, pad))
d = ImageDraw.Draw(canvas)
ry = pad + video.height + gap
btns = ["-2 s", "0.75x", "+2 s"]; bw = (700 - 2 * 16) // 3
for i, t in enumerate(btns):
    bx = 40 + i * (bw + 16)
    d.rounded_rectangle([bx, ry, bx + bw, ry + row_h], radius=16, fill=BTN, outline=BORDER, width=2)
    tw = d.textlength(t, font=reg); d.text((bx + (bw - tw) / 2, ry + row_h / 2 - 18), t, font=reg, fill=(235, 235, 235))
d.rounded_rectangle([40 - 10, ry - 10, 740 + 10, ry + row_h + 10], radius=22, outline=ORANGE, width=6)
label(d, (30, ry + row_h + 24), "Proposed: 2-second step and a slower speed")
canvas.save(OUT + "33-skip-mockup.jpg", quality=86); print("33", canvas.size)
