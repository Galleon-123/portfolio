"""Render a seamless decorative katana-lightning and flame loop from the site art.

Authoring tool only; the published site loads the pre-rendered MP4 and has no
Python or FFmpeg runtime dependency.
"""

from __future__ import annotations

import math
import random
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "assets" / "katana-hero.webp"
TARGET = ROOT / "assets" / "katana-lightning.mp4"
MOBILE_TARGET = ROOT / "assets" / "katana-mobile.mp4"
MOBILE_POSTER = ROOT / "assets" / "katana-mobile.webp"
WIDTH, HEIGHT = 1280, 720
MOBILE_WIDTH, MOBILE_HEIGHT = 720, 1280
FPS, DURATION = 24, 4
FRAMES = FPS * DURATION


def polyline(draw: ImageDraw.ImageDraw, points: list[tuple[float, float]], fill, width: int) -> None:
    draw.line([(round(x), round(y)) for x, y in points], fill=fill, width=width, joint="curve")


def frame(base: Image.Image, index: int) -> Image.Image:
    phase = 2 * math.pi * index / FRAMES
    glow = Image.new("RGBA", (WIDTH, HEIGHT))
    lines = Image.new("RGBA", (WIDTH, HEIGHT))
    gd, ld = ImageDraw.Draw(glow), ImageDraw.Draw(lines)

    # Red flame ribbons rise from the figure; the paths cycle without moving
    # the background or zooming the camera.
    for strand in range(12):
        foot_x = 1016 + strand * 13
        foot_y = 272 + (strand % 3) * 5
        height = 93 + (strand % 4) * 19
        points = []
        for step in range(11):
            portion = step / 10
            y = foot_y - height * portion
            x = foot_x + 11 * math.sin(phase + portion * 5.3 + strand * .82) + portion * (strand - 5) * 1.7
            points.append((x, y))
        color = (255, 46 + strand % 3 * 23, 39, 38 + strand % 4 * 10)
        polyline(gd, points, color, 11)
        polyline(ld, points, (255, 72 + strand % 3 * 24, 48, 56), 2)

    # The bright charge moves repeatedly from the hilt toward the tip.
    hilt, tip = (1028, 196), (913, 264)
    points = []
    for step in range(13):
        portion = step / 12
        x = hilt[0] + (tip[0] - hilt[0]) * portion
        y = hilt[1] + (tip[1] - hilt[1]) * portion
        jitter = math.sin(step * 4.1 + phase * 3) * 4 * math.sin(math.pi * portion)
        points.append((x + jitter * .52, y + jitter))
    polyline(gd, points, (60, 154, 255, 115), 15)
    polyline(ld, points, (194, 233, 255, 205), 2)

    for branch in (2, 5, 8, 10):
        start = points[branch]
        direction = -1 if branch % 2 else 1
        length = 15 + 8 * (1 + math.sin(phase * 2 + branch)) / 2
        branch_points = [start,
                         (start[0] + direction * 6, start[1] - length * .5),
                         (start[0] + direction * 12, start[1] - length)]
        strength = round(80 + 70 * (1 + math.sin(phase * 3 + branch)) / 2)
        polyline(gd, branch_points, (66, 167, 255, strength), 6)
        polyline(ld, branch_points, (205, 244, 255, strength), 1)

    progress = (index * 2 / FRAMES) % 1
    charge_x = hilt[0] + (tip[0] - hilt[0]) * progress
    charge_y = hilt[1] + (tip[1] - hilt[1]) * progress
    gd.ellipse((charge_x - 12, charge_y - 12, charge_x + 12, charge_y + 12), fill=(60, 174, 255, 145))
    ld.ellipse((charge_x - 3, charge_y - 3, charge_x + 3, charge_y + 3), fill=(238, 250, 255, 230))

    result = base.copy().convert("RGBA")
    result = Image.alpha_composite(result, glow.filter(ImageFilter.GaussianBlur(14)))
    result = Image.alpha_composite(result, glow.filter(ImageFilter.GaussianBlur(4)))
    result = Image.alpha_composite(result, lines)
    return result.convert("RGB")


def mobile_background() -> Image.Image:
    backdrop = Image.new("RGB", (MOBILE_WIDTH, MOBILE_HEIGHT))
    draw = ImageDraw.Draw(backdrop)
    for y in range(MOBILE_HEIGHT):
        amount = y / MOBILE_HEIGHT
        draw.line((0, y, MOBILE_WIDTH, y), fill=(6, 10 + round(4 * amount), 22 + round(12 * amount)))
    stars = random.Random(42)
    for _ in range(85):
        x, y = stars.randrange(MOBILE_WIDTH), stars.randrange(770)
        strength = stars.randrange(20, 65)
        draw.point((x, y), fill=(strength, strength + 8, strength + 21))
    return backdrop


def mobile_frame(desktop: Image.Image, backdrop: Image.Image, mask: Image.Image) -> Image.Image:
    # Reframe the original art lower in a portrait canvas so the headline stays
    # readable while the katana and character remain visible below the copy.
    scene = desktop.crop((580, 0, 1280, 720)).resize((720, 741), Image.Resampling.LANCZOS)
    result = backdrop.copy()
    result.paste(scene, (0, 550), mask)
    return result


def ffmpeg_command(width: int, height: int, target: Path) -> list[str]:
    return [
        "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{width}x{height}",
        "-r", str(FPS), "-i", "-", "-an", "-c:v", "libx264",
        "-profile:v", "baseline", "-level:v", "3.1", "-bf", "0",
        "-preset", "medium", "-crf", "26", "-pix_fmt", "yuv420p",
        "-movflags", "+faststart", str(target),
    ]


def main() -> None:
    base = Image.open(SOURCE).convert("RGB").resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
    backdrop = mobile_background()
    mask = Image.new("L", (MOBILE_WIDTH, 741))
    mask_draw = ImageDraw.Draw(mask)
    for y in range(741):
        alpha = min(255, round(255 * y / 125), round(255 * (741 - y) / 45))
        mask_draw.line((0, y, MOBILE_WIDTH, y), fill=max(0, alpha))
    mobile_frame(base, backdrop, mask).save(MOBILE_POSTER, "WEBP", quality=88, method=6)
    with subprocess.Popen(ffmpeg_command(WIDTH, HEIGHT, TARGET), stdin=subprocess.PIPE) as desktop_process, \
         subprocess.Popen(ffmpeg_command(MOBILE_WIDTH, MOBILE_HEIGHT, MOBILE_TARGET), stdin=subprocess.PIPE) as mobile_process:
        assert desktop_process.stdin is not None and mobile_process.stdin is not None
        for index in range(FRAMES):
            desktop = frame(base, index)
            desktop_process.stdin.write(desktop.tobytes())
            mobile_process.stdin.write(mobile_frame(desktop, backdrop, mask).tobytes())
        desktop_process.stdin.close()
        mobile_process.stdin.close()
        if desktop_process.wait() != 0 or mobile_process.wait() != 0:
            raise SystemExit("FFmpeg could not render a hero video")
    print(TARGET, MOBILE_TARGET, MOBILE_POSTER)


if __name__ == "__main__":
    main()
