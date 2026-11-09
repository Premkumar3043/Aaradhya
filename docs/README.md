# Aaradhya – Frontend (HTML, CSS, JavaScript + GSAP)

Open this folder in VS Code, install **Live Server** (suggested automatically), right-click `index.html` → **Open with Live Server**.
Or run `npm start`.

- `css/tokens.css` colours, fonts, spacing (Ivory, Charcoal, Gold, Maroon, Sand)
- `css/style.css`, `animations.css`, `responsive.css`, `visual-refresh.css`
- `js/data.js` demo temples, packages, FAQ (edit here)
- `js/art.js` original SVG illustrations (automatic fallback if a real photo cannot load)
- `assets/images/` image notes and optional self-hosted photo location (see README.txt)
- `js/animations.js` GSAP timelines and ScrollTrigger
- `js/main.js` navigation, filters, dialogs, enquiry wizard

All prices, itineraries and package details are demo content.

The refreshed visual direction combines a cinematic Krishna-art hero, layered scroll motion, glass navigation, photo-led destination cards, smooth word reveals and a large footer wordmark. The supplied hero artwork is stored locally in `assets/images/` in optimized desktop and mobile WebP formats. Destination and package temple photographs continue to load from Wikimedia Commons (internet required); see **PHOTO_CREDITS.md** for their attribution and licence details. SVG temple artwork remains as an automatic fallback for destination cards.


## Cinematic scroll and intro
- The opening uses an animated layered lotus before the Aaradhya wordmark. The intro refresh has a versioned session key so the new sequence can be seen after updating the project.
- The Krishna artwork continues as a fixed atmospheric layer behind the Featured Destinations, Aaradhya Difference and Packages panels. These panels float over the image, which fades away before the next chapter.
- The large footer wordmark reveals all letters and replays when it re-enters the viewport.


## Cinematic motion notes
- Smooth scrolling is powered by Lenis 1.3.27 from its official CDN script; if the CDN is unavailable, the site falls back to native browser scrolling.
- The intro lotus uses a local one-shot animated GIF. It plays once from open flower → folding bud → stem/water rings → full bloom, then holds the final frame.
- Page content reveals use the Selene-style IntersectionObserver `.is-in` pattern (opacity and transform only; no blur filters).


### Motion implementation
The page uses the Lenis single-RAF scroll loop adapted from the supplied Selene source. Individual `[data-reveal]` and `[data-stagger]` elements receive direct scroll-progress transforms; full section wrappers are not blurred, clipped or translated. The intro lotus is an isolated transparent WebM sequence and the Aaradhya wordmark appears after the bloom completes.


### Git / GitHub
This folder is the source project to track with Git. Commit the extracted source files, not the exported ZIP archive. The included `.gitignore` excludes local secrets, dependency/build folders, editor-specific files, logs and ZIP backups.
