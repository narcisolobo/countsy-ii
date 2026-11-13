---
version: 1
slug: "src-routes-counters-page-svelte"
primary_target: "src/routes/counters/+page.svelte"
related_targets: ["src/routes/+page.svelte","src/routes/counters/[id]/edit/+page.svelte","src/routes/privacy/+page.svelte","src/routes/terms/+page.svelte"]
---

# Countsy redesign (Operate; applies to counters, edit, sign-in, legal pages)

Scope: complete visual replacement of the app. Mode: Operate. Phone first. Light and dark both designed. Landing page collapses into a bare sign-in screen.

## Direction contract

THESIS: A counter is a utility meter you read at a glance. The surface refuses the DaisyUI card grid, cute mascot and neon dark theme, and any "habit app" polish.

OWN-WORLD: Water-meter register. Cool enamel-grey ground (#eceff1, deliberately not cream), near-black ink (#14181c), one meter blue (#1f5f8b) for the header plate and unit labels, condensed uppercase labels (Barlow Condensed style), Barlow body. Values are set in drum digits: black tiles, light digits, all digits the same colour. Red is reserved for state only (failed save), never decoration. Dark: instrument-panel ground (#101418) with light drum tiles. Controls are plain outlined buttons.

STORY: The visitor sees their counters as meter readings, reads the number instantly, taps minus or plus, and trusts that the number is saved or visibly rolled back.

FIRST VIEWPORT: Blue header plate with Countsy and menu. Below, one card per counter: uppercase blue label, the drum-digit register at about 74px, a full-width minus and plus pair of 50px targets beneath. Goal shown as a quiet "of N" line when set. Goal reached is the one allowed celebration: the glass goal gauge fills to its brim line and turns meter blue (DESIGN.md; superseded the earlier flow-indicator disc).

FORM: Water-Meter Register, the pick card, position 1 of 7 on my list; user chose it. seed:654f3c463b02ad47. Steer: the red last-digit in the sketch is dropped; digits are uniform.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Notes
Motion: only feedback on actions (digit change, press, save/rollback) plus the one world-native goal-reached moment (the gauge reaching its brim). Sign-in: a little more than one line saying what the app does and how to use it; no selling. No crow. Chosen sketch: .impeccable/mocks/decision/model-pick.html

## Handoff (state 2026-11-13)

Built in SvelteKit 3 / Svelte 5 on branch svelte-rewrite (React app retired at cutover; see docs/adr/0001):
- `/` sign-in screen (landing folded into it), `/counters` (cards, drum register, glass gauge, plus/minus with optimistic save and visible rollback, create, inline rename, archive/restore, two-step delete of archived counters, Show archived), `/counters/[id]/edit`, privacy, terms, error page.
- Finish review run (verdict: ship after fixes); all 8 material fixes applied: archived counters read-only end to end, menu only when signed in, sign-in heading "Sign in", Google button dark variant, full-height shell, title row full width with the gauge below it, edit actions Save-first, 48px rename targets, single "New counter" control.
- Open ideas from the review, not adopted yet: scale drum tiles to the card's content width on phone; make "reached" read more strongly at the brim (lip/brim turning blue a frame earlier, or a thicker outline).

Constraints from the user: WCAG AA; phone first; read-the-number-fast is the main task; no cute, trendy-minimal, or cold-corporate; red only for failed save/load; motion only as action feedback plus the one goal-reached moment; sign-in copy is a little more than one line, explains what it does and how to use it, no selling.
