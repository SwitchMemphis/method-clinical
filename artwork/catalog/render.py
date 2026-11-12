"""Typeset catalog label artwork and export it on the generated package photographs."""

import argparse
from concurrent.futures import ThreadPoolExecutor
import json
import math
from pathlib import Path
import re
import subprocess
from tempfile import TemporaryDirectory

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[2]
HERE = Path(__file__).resolve().parent
CATALOG = ROOT / "src/data/mocks/catalog-reference.json"
OUTPUT = ROOT / "public/assets/mint-catalog"
LOGO = ROOT / "public/assets/mint-clinical-wordmark.png"

# Printable face measured on the normalized 1000 px source photographs.
FACES = {
    "vial": (347, 414, 652, 784),
    "nasal": (368, 528, 632, 835),
    "oral": (302, 403, 697, 784),
    "carton": (256, 150, 742, 943),
    "supply": (117, 247, 883, 794),
}
EMERALD = "#073d28"
WHITE = "#f5f9f6"
MINT = "#8af4b5"


def package_form(product):
    name = product["name"].lower()
    if "nasal spray" in name:
        return "nasal", "Nasal spray"
    if "dissolvable strips" in name:
        return "carton", "Dissolvable strips"
    if "tablets" in name:
        return "oral", "Tablets"
    if product["slug"].startswith("dihexa-60-caps"):
        return "oral", "Capsules"
    if product["slug"].startswith(("custom-boxes-", "reconstitution-kit-", "klotho-derived-")):
        return "supply", ""
    return "vial", ""


def wrap_words(draw, text, font, width):
    lines = []
    current = ""
    for word in text.split():
        candidate = f"{current} {word}".strip()
        if current and draw.textlength(candidate, font=font) > width:
            lines.append(current)
            current = word
        else:
            current = candidate
    return lines + [current] if current else lines


def fit_text(draw, text, font_path, weight, width, height, preferred_size):
    for size in range(preferred_size, 10, -1):
        font = ImageFont.truetype(str(font_path), size)
        font.set_variation_by_name(weight)
        lines = wrap_words(draw, text, font, width)
        spacing = round(size * 1.03)
        if len(lines) * spacing <= height and all(draw.textlength(line, font=font) <= width for line in lines):
            return font, lines, spacing
    raise ValueError(f"Label does not fit: {text}")


def text_block(draw, center_x, center_y, text, font_path, weight, width, height, size, color):
    font, lines, spacing = fit_text(draw, text, font_path, weight, width, height, size)
    top = center_y - (len(lines) - 1) * spacing / 2
    for index, line in enumerate(lines):
        draw.text((center_x, top + index * spacing), line, font=font, fill=color, anchor="mm")
    return font, lines, spacing


def label_artwork(form, format_name, title, strength, mark, font_path, vial_texture):
    left, top, right, bottom = FACES[form]
    width, height = right - left, bottom - top
    label = Image.new("RGBA", (width, height))
    pen = ImageDraw.Draw(label)
    seam = round(height * 0.285)
    flat = form in {"carton", "supply"}
    bottom_inset = 0 if flat else 4

    pen.polygon([(0, seam), (width, seam), (width, height - bottom_inset), (width * .74, height - 1),
                 (width * .26, height - 1), (0, height - bottom_inset)], fill=EMERALD)
    if form == "vial":
        texture = Image.new("RGBA", label.size)
        texture.paste(vial_texture.resize((width, height - seam), Image.Resampling.LANCZOS), (0, seam))
        texture.putalpha(label.getchannel("A"))
        label = texture
    else:
        contour = Image.new("RGBA", label.size)
        contour_pen = ImageDraw.Draw(contour)
        for offset in range(-width, 2 * width, max(12, width // 16)):
            line = []
            for y in range(seam, height, 3):
                t = (y - seam) / (height - seam)
                x = offset + width * (.14 * math.sin(6.8 * t + offset / width) + .24 * t)
                line.append((x, y))
            contour_pen.line(line, fill=(89, 227, 147, 39), width=max(1, width // 280))
        contour.putalpha(Image.composite(contour.getchannel("A"), Image.new("L", label.size), label.getchannel("A")))
        label.alpha_composite(contour)

        if not flat:
            sheen = Image.new("RGBA", label.size)
            sheen_pen = ImageDraw.Draw(sheen)
            for x in range(width):
                normalized = x / width
                edge = abs(normalized - .5) * 2
                side_light = math.exp(-((normalized - .13) / .07) ** 2)
                shade = (0, 17, 10, int(84 * edge ** 5)) if edge > .72 else (225, 255, 241, int(27 * side_light))
                sheen_pen.line((x, seam, x, height), fill=shade)
            sheen.putalpha(Image.composite(sheen.getchannel("A"), Image.new("L", label.size), label.getchannel("A")))
            label.alpha_composite(sheen)

    pen = ImageDraw.Draw(label)
    mark_height = min(round(seam * .67), round(width * .205), 103)
    mark_width = round(mark.width * mark_height / mark.height)
    symbol = Image.new("RGBA", (mark_width, mark_height), EMERALD)
    symbol.putalpha(mark.resize(symbol.size, Image.Resampling.LANCZOS))
    word_font = ImageFont.truetype(str(font_path), round(mark_height * .48))
    word_font.set_variation_by_name("Bold")
    word_width = max(pen.textlength(word, font=word_font) for word in ("Mint", "Clinical"))
    gap = round(mark_height * .14)
    lockup_left = round((width - mark_width - gap - word_width) / 2)
    label.alpha_composite(symbol, (lockup_left, round((seam - mark_height) / 2)))
    for index, word in enumerate(("Mint", "Clinical")):
        pen.text((lockup_left + mark_width + gap, seam * (.375 + index * .255)), word,
                 font=word_font, fill=EMERALD, anchor="lm")

    center = width / 2
    content_height = height - seam
    text_width = round(width * .83)
    title_y = seam + content_height * (.22 if format_name else .235)
    text_block(pen, center, title_y, title, font_path, "Bold", text_width,
               round(content_height * (.32 if format_name else .28)), min(round(width * .19), round(content_height * .31)), WHITE)

    if format_name:
        text_block(pen, center, seam + content_height * .445, format_name.upper(), font_path, "SemiBold",
                   text_width, round(content_height * .10), round(width * .073), WHITE)

    if strength:
        badge_y = seam + content_height * (.635 if format_name else .53)
        font, lines, spacing = fit_text(pen, strength, font_path, "Bold", round(width * .72),
                                        round(content_height * .22), round(width * .108))
        badge_width = max(pen.textlength(line, font=font) for line in lines) + width * .085
        badge_height = len(lines) * spacing + content_height * .043
        pen.rounded_rectangle((center - badge_width / 2, badge_y - badge_height / 2,
                               center + badge_width / 2, badge_y + badge_height / 2), radius=2, fill=MINT)
        for index, line in enumerate(lines):
            pen.text((center, badge_y + (index - (len(lines) - 1) / 2) * spacing), line,
                     font=font, fill=EMERALD, anchor="mm")

    if form == "vial":
        text_block(pen, center, seam + content_height * .70, "Purity exceeds 99%", font_path, "Medium",
                   text_width, round(content_height * .12), round(width * .074), WHITE)

    if form in {"vial", "nasal", "oral", "carton"}:
        pen.line((width * .12, seam + content_height * .81, width * .88, seam + content_height * .81),
                 fill=(206, 239, 220, 180), width=1)
        text_block(pen, center, seam + content_height * .90, "Physician use only", font_path, "Medium",
                   text_width, round(content_height * .12), round(width * .076), WHITE)

    return label, left, top


def variants(product):
    if product["slug"].startswith("custom-boxes-"):
        return [""]
    return [value if value != "—" else "" for value in product["strengths"]] or [""]


def display_name(product, format_name):
    title = re.sub(r"\s*\(\d+(?:\.\d+)?\s*(?:mg|mcg)\)", "", product["name"], flags=re.I)
    if format_name and title.lower().endswith(format_name.lower()):
        title = title[:-len(format_name)].rstrip()
    return title


def render_product(product, mark, font_path, vial_texture):
    form, format_name = package_form(product)
    title = display_name(product, format_name)
    images = []
    with TemporaryDirectory() as folder:
        label_file = Path(folder) / "label.png"
        for index, strength in enumerate(variants(product)):
            variant_slug = re.sub(r"[^a-z0-9]+", "-", strength.lower()).strip("-")
            filename = f"{product['slug']}-{index + 1:02d}"
            if variant_slug:
                filename += f"-{variant_slug}"
            if form == "vial":
                filename += "-purity-label"
            filename += ".webp"
            label, x, y = label_artwork(form, format_name, title, strength, mark, font_path, vial_texture)
            label.save(label_file)
            subprocess.run(["magick", str(HERE / "templates" / f"{form}.webp"), str(label_file),
                            "-geometry", f"+{x}+{y}", "-compose", "Over", "-composite",
                            "-filter", "Lanczos", "-resize", "960x960", "-quality", "86", str(OUTPUT / filename)],
                           check=True)
            images.append(f"/assets/mint-catalog/{filename}")
    return images


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--font", type=Path, required=True, help="Google Sans Flex variable font (Latin)")
    parser.add_argument("--sample", action="store_true", help="Render representative products without modifying catalog data")
    args = parser.parse_args()
    products = json.loads(CATALOG.read_text())
    if args.sample:
        sample_slugs = {"nad-500-mg", "adamax-nasal-spray-10-mg-10-ml", "ghk-cu-ir-tablets-2-mg-tablet-30cc-bottle-30-ct",
                        "wolverine-dissolvable-strips-500-mcg-bpc-157-300-mcg-tb-500-per-strip-30-strips",
                        "reconstitution-kit-1-kit",
                        "rem-blend-nasal-spray-dsip-10-pinealon-10-melatonin-50-gaba-250-mg-10-ml"}
        products = [product for product in products if product["slug"] in sample_slugs]

    with Image.open(LOGO) as flow_logo:
        mark = flow_logo.getchannel("A").crop((0, 0, 115, flow_logo.height))
        mark = mark.crop(mark.getbbox())
    with Image.open(HERE / "templates" / "vial-label-contours.webp") as texture:
        vial_texture = texture.convert("RGB")
    OUTPUT.mkdir(parents=True, exist_ok=True)
    with ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(lambda product: render_product(product, mark, args.font, vial_texture), products))
    for product, images in zip(products, results, strict=True):
        product["images"] = images
    if not args.sample:
        CATALOG.write_text(json.dumps(products, indent=2, ensure_ascii=False) + "\n")
    print(f"Rendered {sum(map(len, results))} images across {len(products)} listings.")


if __name__ == "__main__":
    main()
