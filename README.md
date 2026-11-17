# Ragul Kumar E — Portfolio

A connected, responsive portfolio with the user-supplied dragon artwork transformed into a midnight blue and neon red full-screen animated hero, current education at the top, UniServ and ongoing Web OS projects, verified credentials in the middle, skills and background, glowing public account links at the end, and a print-ready résumé.

## Preview and build

Run `npm run dev`, then open http://localhost:4173. Run `npm run check` and `npm run build` to prepare `dist/`. Node.js and Python 3 support the local development commands. Pillow and FFmpeg are only needed to regenerate the two hero videos with `python3 scripts/render_katana_video.py`. The website uses static HTML, CSS, and JavaScript for a short, muted, looped hero video with flowing katana lightning and flame aura, ambient Canvas particles, staggered entrances, viewport-aware project accents, scroll reveals, active chapter navigation, an SVG progress path, reading progress, the current year, and the résumé print button. Landscape and portrait videos both cover the home section; the page switches at 600 px. Native anchors and content remain available without JavaScript.

Publish only `dist/`. The existing `.openai/hosting.json` holds the Sites identity. The GitHub Pages workflow builds and publishes the same output.

## Edit content

Update `index.html` and `resume.html` together. Keep certificate PDFs in `25IT200/` and follow `CONTENT_NOTES.md` for factual accuracy. Use the supplied facts and supporting evidence; do not invent experience, credentials, metrics, or project results. If changing domains, update the canonical and sharing URLs, robots.txt, sitemap.xml, and résumé portfolio link.

## Accessibility and privacy

Semantic sections, sticky navigation with the active chapter, a skip link, keyboard focus styles, native expandable learning links, and system reduced-motion support. The hero and footer animation controls pause all decorative motion, including the video, and persist the visitor’s preference locally. The system reduced-motion preference is honored by default, with an explicit visitor override; the still artwork is the video fallback. If a browser blocks autoplay, a play button appears over the video. Scroll transitions are progressive enhancements, not scroll locking or scroll snapping. The SVG path updates with a throttled animation frame and resizes when content expands. Its multicolor gradient follows chapter positions. The sliding navigation marker, background glow, and accent color blend together as the visitor moves between sections; links remain standard anchors. Particle rendering is capped near 30 fps and stops when the hero is offscreen, the tab is hidden, or animations are paused. The video and CSS decoration also pause offscreen and in hidden tabs. Fonts and artwork are self-hosted. The hero image and video are decorative concept art, not a game screenshot or a claim of completed game work. There are no trackers, user accounts, forms, API keys, or third-party runtime requests. `_headers` provides HTTP policies for compatible hosts, with a meta CSP for static hosts. GitHub Pages does not apply `_headers`.

## Earlier iterations

Codex implemented the site, with AGY design and security review during earlier iterations. Those designs are preserved in ignored `.codex/backups/`; the current version follows the user’s request for a professional, simple, modern portfolio with a cinematic hero.
