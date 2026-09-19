#!/usr/bin/env python3
"""
Ubah gambar sumber di assets/img/ menjadi WebP siap pakai di public/img/.

Sumbernya (PNG/JPEG mentah, ~52 MB) sengaja tidak ikut di-commit — lihat
.gitignore. Yang diunduh tamu hanyalah hasil WebP di public/img/.

Jalankan dari akar project:

    python tools/optimize-images.py

Butuh Pillow:  pip install Pillow
"""

import os
import sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "img")
OUT = os.path.join(ROOT, "public", "img")

# Nama berkas sumber dipetakan ke nama tujuan yang bermakna.
# Kolom: (berkas sumber, tujuan relatif terhadap public/img, sisi terpanjang, mutu)
JOBS = [
    # --- Latar belakang -----------------------------------------------------
    ("ChatGPT Image Sep 19, 2026, 03_17_28 PM.png", "bg/sky.webp",        1600, 80),
    ("ChatGPT Image Sep 19, 2026, 03_19_24 PM.png", "bg/arch.webp",       1600, 80),
    ("ChatGPT Image Sep 19, 2026, 03_38_02 PM.png", "bg/balcony.webp",    1600, 80),

    # --- Ornamen bunga (transparan) ----------------------------------------
    ("ChatGPT Image Sep 19, 2026, 03_05_52 PM.png", "floral/swag.webp",      1400, 85),
    ("ChatGPT Image Sep 19, 2026, 03_20_49 PM.png", "floral/wreath.webp",    1100, 85),
    ("ChatGPT Image Sep 19, 2026, 03_22_31 PM.png", "floral/arch-gold.webp", 1100, 85),
    ("ChatGPT Image Sep 19, 2026, 03_23_40 PM.png", "floral/frame-hex.webp", 1100, 85),
    ("ChatGPT Image Sep 19, 2026, 03_24_48 PM.png", "floral/corner-a.webp",  1100, 85),
    ("ChatGPT Image Sep 19, 2026, 03_25_59 PM.png", "floral/bouquet.webp",   1000, 85),
    ("ChatGPT Image Sep 19, 2026, 03_27_01 PM.png", "floral/leaf.webp",       900, 85),
    ("ChatGPT Image Sep 19, 2026, 03_29_05 PM.png", "floral/ribbon.webp",    1100, 85),
    ("ChatGPT Image Sep 19, 2026, 03_32_36 PM.png", "floral/corner-b.webp",  1100, 85),
    ("ChatGPT Image Sep 19, 2026, 03_32_46 PM.png", "floral/corner-c.webp",  1100, 85),
    ("ChatGPT Image Sep 19, 2026, 03_33_05 PM.png", "floral/corner-d.webp",  1100, 85),
    ("ChatGPT Image Sep 19, 2026, 03_35_31 PM.png", "floral/corner-e.webp",  1100, 85),

    # --- Foto ---------------------------------------------------------------
    ("ChatGPT Image Sep 19, 2026, 03_36_16 PM.png", "photo/hero.webp",     1400, 82),
    ("ChatGPT Image Sep 19, 2026, 03_41_25 PM.png", "photo/bride-1.webp",  1200, 82),
    ("ChatGPT Image Sep 19, 2026, 03_42_32 PM.png", "photo/bride-2.webp",  1200, 82),
    ("ChatGPT Image Sep 19, 2026, 03_43_37 PM.png", "photo/bride-3.webp",  1200, 82),
    ("ChatGPT Image Sep 19, 2026, 03_44_52 PM.png", "photo/groom-1.webp",  1200, 82),
    ("ChatGPT Image Sep 19, 2026, 03_47_26 PM.png", "photo/groom-2.webp",  1200, 82),
    ("ChatGPT Image Sep 19, 2026, 03_48_28 PM.png", "photo/couple-1.webp", 1200, 82),
    ("ChatGPT Image Sep 19, 2026, 03_50_47 PM.png", "photo/couple-2.webp", 1200, 82),
    ("ChatGPT Image Sep 19, 2026, 03_51_54 PM.png", "photo/couple-3.webp", 1200, 82),
]


def has_alpha(im):
    return im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)


def convert(src_name, rel_dest, max_side, quality):
    src = os.path.join(SRC, src_name)
    dest = os.path.join(OUT, rel_dest.replace("/", os.sep))

    if not os.path.isfile(src):
        print(f"  LEWAT  {rel_dest:<26} sumber tidak ada: {src_name}")
        return 0

    os.makedirs(os.path.dirname(dest), exist_ok=True)

    im = Image.open(src)
    alpha = has_alpha(im)
    im = im.convert("RGBA" if alpha else "RGB")

    if max(im.size) > max_side:
        ratio = max_side / max(im.size)
        im = im.resize(
            (round(im.width * ratio), round(im.height * ratio)),
            Image.LANCZOS,
        )

    im.save(dest, "WEBP", quality=quality, method=6)

    before = os.path.getsize(src)
    after = os.path.getsize(dest)
    print(
        f"  OK     {rel_dest:<26} {im.width}x{im.height}  "
        f"{before/1_048_576:5.2f} MB -> {after/1024:6.0f} KB"
        f"{'  (alpha)' if alpha else ''}"
    )
    return after


def main():
    if not os.path.isdir(SRC):
        sys.exit(f"Folder sumber tidak ditemukan: {SRC}")

    print(f"Sumber : {SRC}")
    print(f"Tujuan : {OUT}\n")

    total = sum(convert(*job) for job in JOBS)
    print(f"\nTotal hasil: {total/1_048_576:.2f} MB untuk {len(JOBS)} berkas.")


if __name__ == "__main__":
    main()
