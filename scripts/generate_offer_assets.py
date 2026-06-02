"""
Generate visual assets for the ScaleSteady /offer page.
Outputs to public/offer/. Run once locally before deploy.
Requires: pip install Pillow numpy
"""
import os
import numpy as np
from PIL import Image, ImageDraw

OUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'offer')
os.makedirs(OUT_DIR, exist_ok=True)

# ---------- Asset 1: Hero Void Gradient with Noise ----------
def generate_hero_gradient(width=2560, height=1440):
    """Radial gradient from #050D1C center to #0A1E36 edges, with grain."""
    img = np.zeros((height, width, 3), dtype=np.float64)

    # Center of radial gradient
    cy, cx = height / 2, width / 2
    max_dist = np.sqrt(cx**2 + cy**2)

    # Color endpoints (RGB float)
    c_center = np.array([5, 13, 28], dtype=np.float64)    # #050D1C
    c_edge = np.array([10, 30, 54], dtype=np.float64)     # #0A1E36

    # Build radial gradient
    y_coords, x_coords = np.mgrid[0:height, 0:width]
    dist = np.sqrt((x_coords - cx)**2 + (y_coords - cy)**2) / max_dist
    dist = np.clip(dist, 0, 1)

    for ch in range(3):
        img[:, :, ch] = c_center[ch] + (c_edge[ch] - c_center[ch]) * dist

    # Add film grain noise (8% intensity)
    noise = np.random.normal(0, 6, (height, width, 3))
    img = np.clip(img + noise, 0, 255).astype(np.uint8)

    result = Image.fromarray(img, 'RGB')
    path = os.path.join(OUT_DIR, 'hero-void.jpg')
    result.save(path, 'JPEG', quality=88)
    print(f"Generated: {path} ({width}x{height})")

# ---------- Asset 2: Blueprint Grid Tile ----------
def generate_blueprint_tile(size=200):
    """Subtle blueprint grid on near-black, tileable."""
    img = Image.new('RGB', (size, size), (8, 14, 26))
    draw = ImageDraw.Draw(img)

    line_color = (18, 32, 56)  # very subtle white-ish lines
    spacing = 40

    # Vertical lines
    for x in range(0, size, spacing):
        draw.line([(x, 0), (x, size)], fill=line_color, width=1)

    # Horizontal lines
    for y in range(0, size, spacing):
        draw.line([(0, y), (size, y)], fill=line_color, width=1)

    path = os.path.join(OUT_DIR, 'blueprint-tile.png')
    img.save(path, 'PNG')
    print(f"Generated: {path} ({size}x{size})")

if __name__ == '__main__':
    generate_hero_gradient()
    generate_blueprint_tile()
    print("Done. Assets in public/offer/")
