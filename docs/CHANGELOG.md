# Aaradhya frontend refresh

## Visual update
- Reworked the opening into a cinematic temple-photo hero with a layered radial scrim, warm gold accent, refined serif headline and glass-style navigation.
- Added word-by-word hero reveals, a softly animated status accent, interactive hover lighting and a responsive glass search panel.
- Added an oversized masked-letter Aaradhya footer wordmark and a subtle desktop-only custom cursor.
- Refined destination/package card surfaces, image transitions, section spacing, focus states and mobile breakpoints.

## Temple photography
- Connected all nine destination records to real temple photographs from Wikimedia Commons.
- The hero photograph loads eagerly; destination and package images load lazily and decode asynchronously.
- Original SVG temple art remains visible as a fallback when a photograph cannot load.
- Full photographer credits, source pages and reuse licences are in `PHOTO_CREDITS.md`. The photos load remotely, so an internet connection is required to display them.

## Existing flows retained
- Destination search, state/deity filters and sorting.
- Package filters and itinerary details.
- Journey enquiry wizard, FAQ interactions, dialogs and toast feedback.

## Run locally
Open `index.html` with Live Server, or run `npm start` from this folder.

## Journey planner entry points
- Selecting a temple card or using a temple's “Plan a visit” action opens the guided journey planner with that temple preselected.
- Homepage search date and traveller range are carried into a fresh enquiry when available; details already entered in an in-progress enquiry are preserved.

## Dialog positioning fix
- Anchored temple and package detail dialogs to the viewport so their first opening is centered even when the page is scrolled.
- Moved the opening animation to the dialog's inner panel to keep modal positioning independent of animation transforms.

## Cinematic devotional visual refresh
- Replaced the remote Somnath hero photograph with the supplied Krishna artwork, optimized into local desktop and mobile WebP assets.
- Added a layered blurred backdrop and a restrained scroll-driven depth transition inspired by the Selene reference, tuned to Aaradhya's charcoal, ivory and gold palette.
- Redesigned the Aaradhya emblem around a temple arch, sacred flame and lotus, with a drawn logo reveal and a refined wordmark entrance.
- Refined section/card reveals and made the footer wordmark replay whenever it re-enters the viewport.


## Lotus intro and layered devotional scrolling
- Replaced the intro emblem with a multi-layer lotus that opens in stages before the AARADHYA wordmark, tagline and actions reveal.
- Added a persistent Krishna artwork layer behind the Featured Destinations, Aaradhya Difference and Packages chapters; the translucent sections rise over the image and the backdrop fades before the following chapter.
- Repaired the footer wordmark fill by applying the metallic gradient to each generated letter, and made the letter reveal replay cleanly on each viewport re-entry.

## Selene-inspired full-site cinematic pass
- Kept the Krishna artwork continuously visible behind the complete site, from the hero through the footer, with slow scroll-linked parallax.
- Added scroll-scrubbed section handoffs with a soft crop, lift and settle inspired by Selene's pinned layered scene.
- Reworked section surfaces as translucent versions of Aaradhya's existing palette so the artwork remains visible without sacrificing readability.
- Rebuilt the footer wordmark reveal to animate all letters and replay on every re-entry to the viewport.
- Expanded the lotus SVG and slowed the staged petal bloom/name reveal; intro session key advanced to v2.

## Content-first scroll refinement
- Removed opaque/transformed full-section panels that caused overlap and blocked the shared Krishna artwork.
- Kept the Krishna artwork continuous and more visible from the hero through the footer.
- Replaced whole-panel movement with smooth scroll-scrubbed reveals on section headings, cards, steps, FAQ items and footer content.
- Corrected the final call-to-action text contrast and reduced the hero CTA ghosting over the next section.

## Cinematic motion and lotus intro polish
- Removed the cursor-following “Plan Your Journey” glass label and ring; the real navigation and journey CTAs remain.
- Rebuilt the intro as one SVG/GSAP sequence based on the supplied video: open flower, folded bud, drawn stem and water rings, full petal unfurl, then the Aaradhya name reveal.
- Added a soft water-light texture derived from the supplied lotus artwork.
- Brightened the continuous Krishna artwork and section typography while keeping section wrappers transparent.
- Refined section transitions using scroll-scrubbed, content-only movement and a continuous parallax background inspired by the supplied Selene project.
- Reworked the footer wordmark split/replay logic so every letter re-enters together whenever the mark returns to view.


## Final motion and intro cleanup
- Replaced the hand-built lotus path animation with a 12-frame, one-shot lotus sequence matching the supplied open → bud → stem/ripple → full bloom reference.
- Replaced blur-based GSAP scroll scrubbing with Selene's Lenis single-RAF pattern and IntersectionObserver `.is-in` reveals.
- Removed all blur filters from scrolling content transitions and removed the previous exit fade that dimmed content as it left the viewport.
- Kept the continuous Krishna artwork and all existing temple, package, dialog and journey-planner flows.

## Final clean motion and lotus release
- Rebuilt the intro using the isolated lotus fold-to-bud, stem/ripple and full-bloom sequence, encoded as a transparent 724px VP9 WebM with motion interpolation.
- Corrected the lotus stage to a square aspect ratio so the flower is not compressed or cropped.
- Ported Selene's Lenis single-requestAnimationFrame loop and direct scroll-frame subscribers for the full page.
- Replaced blur-heavy reveals with crisp, per-element scroll-progress movement (opacity and small translate only); section wrappers remain stationary.
- Added a native smooth-scroll fallback if the Lenis CDN is unavailable.
- Kept the temple planner, destination prefill, detail dialogs and enquiry flow unchanged.
