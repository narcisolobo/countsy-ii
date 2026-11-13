---
version: 1
slug: "src-routes-counters-page-svelte"
primary_target: "src/routes/counters/+page.svelte"
related_targets: ["src/routes/+page.svelte","src/routes/privacy/+page.svelte","src/routes/terms/+page.svelte"]
---

# Countsy redesign (Operate; applies to counters, edit, sign-in, legal pages)

Scope: complete visual replacement of the app. Mode: Operate. Phone first. Light and dark both designed. Landing page collapses into a bare sign-in screen.

## Direction contract

THESIS: A counter is a utility meter you read at a glance. The surface refuses the DaisyUI card grid, cute mascot and neon dark theme, and any "habit app" polish.

OWN-WORLD: Water-meter register. Cool enamel-grey ground (#eceff1, deliberately not cream), near-black ink (#14181c), one meter blue (#1f5f8b) for the header plate and unit labels, condensed uppercase labels (Barlow Condensed style), Barlow body. Values are set in drum digits: black tiles, light digits, all digits the same colour. Red is reserved for state only (failed save), never decoration. Dark: instrument-panel ground (#101418) with light drum tiles. Controls are plain outlined buttons.

STORY: The visitor sees their counters as meter readings, reads the number instantly, taps minus or plus, and trusts that the number is saved or visibly rolled back.

FIRST VIEWPORT: Blue header plate with Countsy and menu. Below, one card per counter: uppercase blue label, the drum-digit register at about 74px, a full-width minus and plus pair of 50px targets beneath. Goal shown as a quiet "of N" line when set. Goal reached triggers the one allowed celebration: the meter flow-indicator disc spins once while the drums settle (SVG/CSS, no library; static state under reduced motion).

FORM: Water-Meter Register, the pick card, position 1 of 7 on my list; user chose it. seed:654f3c463b02ad47. Steer: the red last-digit in the sketch is dropped; digits are uniform.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Notes
Motion: only feedback on actions (digit change, press, save/rollback) plus the one world-native goal-reached animation (flow-indicator spin). Sign-in: a little more than one line saying what the app does and how to use it; no selling. No crow. Chosen sketch: .impeccable/mocks/decision/model-pick.html

## Handoff (state at pause)

Done: PRODUCT.md updated; direction chosen (Water-Meter Register, sketch at .impeccable/mocks/decision/model-pick.html, but its cream ground and red last digit are superseded by this brief); build path code-first; live mode configured (.impeccable/live/config.json, no CSP).

Not started: no app code has been changed yet.

Awaiting the user's explicit yes on item 1 before building (item 2 is resolved):
1. Remove DaisyUI (keep Tailwind for layout).
2. (Resolved) No Lottie. The goal-reached animation is a flow-indicator spin in SVG/CSS; the user is not attached to Lottie, only to something apropos to the water-meter world.

Planned build order: tokens and fonts for light and dark (replace DaisyUI themes in src/styles/index.css, drop the Synthwave theme and ThemeSwitcher assumptions); counters screen with drum-digit register; edit page; sign-in screen with `/` folded into `/sign-in` (confirm with the user, then update src/App.tsx routes and delete the landing page, src/sections/*, and src/assets/countsy-crow.png); terms and privacy pages; the goal-reached flow-indicator animation. Then run `impeccable detect --json`, spawn impeccable-finish-reviewer (desktop and mobile, both themes), then impeccable-documenter for DESIGN.md.

Constraints from the user: WCAG AA; phone first; read-the-number-fast is the main task; no cute, trendy-minimal, or cold-corporate; red only for failed save; motion only as action feedback plus the one world-native goal animation (flow-indicator spin); sign-in copy is a little more than one line, explains what it does and how to use it, no selling.
