# Portfolio hero artwork

- Tool: built-in imagegen (no CLI fallback).
- Website asset: [assets/gaming-world.webp](assets/gaming-world.webp).
- Generated original retained at `/Users/admin/.codex/generated_images/01a1e336-2abd-71a2-b5ca-f4a63de7c0bb/exec-ccbf1fba-45dc-498d-a967-85ebf47ef1f5.png`.
- The WebP export preserves the composition and is optimized for delivery.
- The artwork is decorative. It does not depict a completed game by Ragul, a real project screenshot, or proof of game-development experience.

## Final generation prompt

Use case: stylized-concept. Asset type: a cinematic wide hero artwork for a simple, professional portfolio aimed at gamers, landscape 16:9 composition. Create original high-end stylized 3D environmental concept art: an enormous clean circular portal ring of worn graphite metal standing in an austere rocky alien valley, ring centered slightly to the right, a tiny anonymous cloaked explorer near its foot for scale. A narrow subtle pale chartreuse emissive strip inside the ring, desaturated sage green atmospheric fog, monumental charcoal cliffs, realistic matte rock materials, a distant small moon, exquisite soft volumetric lighting, a few sparse floating particles, restrained cinematic composition, dark quiet foreground. Moody, mature, sophisticated game-world exploration aesthetic, not cartoon, not cyberpunk city, not an RGB gaming ad. Palette blackened olive charcoal, stone, desaturated green, pale warm mint/chartreuse light. The illustration must be a complete beautiful scene, no interface elements, no letters, no captions, no logo, no watermark. Wide composition with a somewhat quieter dark left third so website text can overlap if needed; important portal and explorer stay in the middle-right. This is decorative concept art, not a screenshot of any existing game.

## Current midnight-blue fire artwork

- Tool: built-in imagegen edit of the earlier website artwork (no CLI fallback).
- Website asset: [assets/gaming-world-fire.webp](assets/gaming-world-fire.webp).
- Generated original: `/Users/admin/.codex/generated_images/01a1e336-2abd-71a2-b5ca-f4a63de7c0bb/exec-dfd3a691-3064-44ec-8b75-2bf59df67040.png`.
- Exported to WebP with Pillow for smaller delivery. The CSS fire glow and embers animate over this art, and can be paused.
- This is decorative concept art, not a screenshot or a real project claim.

### Edit prompt

Use case: stylized-concept. Asset type: cinematic website hero artwork. Edit the supplied image. Preserve the wide rocky sci-fi landscape, the huge circular portal positioned on the right, the lone small cloaked character standing at its base in the lower middle-right, and open dark left side for website text. Transform the atmosphere into deep near-black and midnight blue with electric cobalt illumination from the portal and thin neon crimson highlights. Surround the lone character with a clearly visible but controlled red-orange fire aura and rising ember flames, as if energy is igniting around their silhouette; keep the person's identity anonymous and non-photographic. Keep it elegant, premium, high-contrast, and game-inspired, with readable dark negative space on the left. Do not add text, logos, UI, other characters, or an actual game screenshot. Maintain wide landscape aspect ratio and composition.

## Animated hero loop

The local `assets/portal-loop.mp4` is a six-second, muted, 24 fps H.264 loop derived from the current artwork with a subtle sine-wave camera push. FFmpeg generated the file at 1280×720 using `zoompan` and H.264 CRF 27. It is decorative, with the WebP art as its still and reduced-motion fallback. The page only plays it while the hero is visible and animations are enabled.

## Current dragon scene, 17 November 2026

- Source supplied by the user: `/Users/admin/Downloads/watermark-removed-image_dbc4f46 (1).jpg`.
- Built-in imagegen edit; generated original: `/Users/admin/.codex/generated_images/01a1e336-2abd-71a2-b5ca-f4a63de7c0bb/exec-930482bf-f41f-4ffe-98c8-72625093a76e.png`.
- Current website still/poster: [assets/dragon-hero.webp](assets/dragon-hero.webp).
- Current six-second muted H.264 video: [assets/dragon-breath.mp4](assets/dragon-breath.mp4). FFmpeg derived this from the edited art at 1280×720 and 24 fps with a sine-wave camera push and subtle brightness pulse. CSS adds synchronized blue and neon red glow. The existing pause and reduced-motion controls govern all motion.
- The art remains labeled as decorative concept art. It is not a screenshot of a game or a claim of Ragul's game-development work.

### Current edit prompt

Use case: stylized-concept. Asset type: replacement cinematic website hero artwork, landscape 16:9. Edit the attached image itself; preserve its distinctive composition and subject placement: one immense serpentine dragon arcing across the upper sky with its head near center-right, a lone anonymous swordsman on the high right cliff, a broad army of dark silhouettes in the valley, stars and mountains. Preserve their recognizable silhouettes and spatial relationships. Recolor the dragon's bright pink glow to electric cobalt blue with selective vivid neon red energy in the mane, eyes, claws and along parts of its scales. Give the swordsman a controlled blue and neon red aura. Deepen the background into near-black navy and midnight blue, with subtle red sparks; keep the image dramatic and game-inspired. Keep the left third darker and lower-detail for white webpage text, but do not erase the dragon arc or landscape. Keep the sky and mountains richly detailed. No letters, no logos, no interface, no extra characters, no watermark. This is decorative concept art; do not suggest it is a real game screenshot.

## Responsive video update

The same six-second loop was re-encoded as H.264 Constrained Baseline, level 3.1, with `yuv420p` pixels and fast-start MP4 metadata for wider device support. Its still poster stays visible if playback is unavailable. At widths up to 600 px, CSS displays the entire 16:9 frame below the introduction; wider layouts crop the background around the dragon and swordsman. A manual play button appears only if autoplay is blocked. The video still follows the visitor's pause and reduced-motion preferences.

## Current katana lightning and flame hero

- Built-in imagegen edit of the user-supplied dragon art; generated original: `/Users/admin/.codex/generated_images/01a1e336-2abd-71a2-b5ca-f4a63de7c0bb/exec-5cce99c5-c799-4fce-bb4e-7617ea304e01.png`.
- Desktop still: [assets/katana-hero.webp](assets/katana-hero.webp). Portrait still: [assets/katana-mobile.webp](assets/katana-mobile.webp).
- Desktop loop: [assets/katana-lightning.mp4](assets/katana-lightning.mp4). Portrait loop: [assets/katana-mobile.mp4](assets/katana-mobile.mp4).
- `scripts/render_katana_video.py` creates both four-second, muted H.264 Baseline MP4 files from the edited still. The camera is stationary. Blue-white lightning travels along the katana; red flame ribbons flow upward around the swordsman. The portrait version reframes the same decorative art below a dark area for mobile text. The page loads one source according to screen width and keeps the stills as fallback. Motion controls pause the videos.
- These are decorative visuals. They do not depict a completed game or establish project experience.

### Current image edit prompt

Use case: precise-object-edit. Asset type: website hero poster and base for an animated video. Edit the supplied dragon scene while preserving the wide 16:9 composition, the dragon's body and head, the lone swordsman on the right cliff, the distant army, mountains, night sky, and the dark left side reserved for webpage copy. Change only the energy around the swordsman: make the katana crackle with clearly visible blue-white lightning arcs running along the blade from hilt to tip, and give the swordsman a flowing red and orange flame-like aura that rises around and behind the silhouette. Keep the figure anonymous and recognizable; keep the blade and figure in the same positions. Do not add additional characters, text, UI, logos, or watermarks. Preserve the premium near-black, cobalt blue, and neon red palette. This is decorative concept art, not a game screenshot.
