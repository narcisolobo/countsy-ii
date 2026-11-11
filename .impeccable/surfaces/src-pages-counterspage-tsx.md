---
version: 1
slug: "src-pages-counterspage-tsx"
primary_target: "src/pages/CountersPage.tsx"
related_targets: ["src/pages/EditCounterPage.tsx","src/pages/SignInPage.tsx"]
---

# Countsy redesign (Operate; applies to counters, edit, sign-in, legal pages)

Scope: complete visual replacement of the app. Mode: Operate. Phone first. Light and dark both designed. Landing page collapses into a bare sign-in screen.

## Direction contract

THESIS: A counter is a utility meter you read at a glance. The surface refuses the DaisyUI card grid, cute mascot and neon dark theme, and any "habit app" polish.

OWN-WORLD: Water-meter register. Cool enamel-grey ground (#eceff1, deliberately not cream), near-black ink (#14181c), one meter blue (#1f5f8b) for the header plate and unit labels, condensed uppercase labels (Barlow Condensed style), Barlow body. Values are set in drum digits: black tiles, light digits, all digits the same colour. Red is reserved for state only (failed save), never decoration. Dark: instrument-panel ground (#101418) with light drum tiles. Controls are plain outlined buttons.

STORY: The visitor sees their counters as meter readings, reads the number instantly, taps minus or plus, and trusts that the number is saved or visibly rolled back.

FIRST VIEWPORT: Blue header plate with Countsy and menu. Below, one card per counter: uppercase blue label, the drum-digit register at about 74px, a full-width minus and plus pair of 50px targets beneath. Goal shown as a quiet "of N" line when set. Goal reached triggers the one allowed Lottie celebration.

FORM: Water-Meter Register, the pick card, position 1 of 7 on my list; user chose it. seed:654f3c463b02ad47. Steer: the red last-digit in the sketch is dropped; digits are uniform.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Notes
Motion: only feedback on actions (digit change, press, save/rollback) plus one Lottie on goal reached. Sign-in: a little more than one line saying what the app does and how to use it; no selling. No crow. Chosen sketch: .impeccable/mocks/decision/model-pick.html
