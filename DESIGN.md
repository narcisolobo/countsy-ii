---
name: Countsy
description: A plain counter app set as a water-meter register: enamel ground, black drum tiles, meter blue.
colors:
  meter-blue: "#1f5f8b"
  enamel-grey: "#eceff1"
  porcelain: "#f8fafb"
  ink: "#14181c"
  ink-muted: "#46515a"
  hairline: "#b9c3ca"
  drum-black: "#0d1114"
  drum-digit: "#eceff1"
  plate-ink: "#ffffff"
  fail-red: "#b3261e"
  dark-panel: "#101418"
  dark-surface: "#171c21"
  dark-ink: "#e6ebef"
  dark-ink-muted: "#9aa7b1"
  dark-hairline: "#2f3a43"
  dark-accent-sky: "#73b4e0"
  dark-plate: "#1a4d70"
  dark-fail-red: "#ff8f86"
typography:
  plate:
    fontFamily: "Barlow Condensed, Barlow, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.1em"
  label:
    fontFamily: "Barlow Condensed, Barlow, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.05em"
  button:
    fontFamily: "Barlow Condensed, Barlow, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.55
    letterSpacing: "0.05em"
  body:
    fontFamily: "Barlow, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  register:
    fontFamily: "Barlow, ui-sans-serif, system-ui, sans-serif"
    fontSize: "74px"
    fontWeight: 600
    lineHeight: 1
    fontFeature: "tnum"
rounded:
  sm: "2px"
  drum: "0.06em"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  touch: "48px"
components:
  button:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "8px 20px"
    height: "48px"
  button-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.enamel-grey}"
  button-primary:
    backgroundColor: "transparent"
    textColor: "{colors.meter-blue}"
    rounded: "{rounded.sm}"
    padding: "8px 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.meter-blue}"
    textColor: "{colors.enamel-grey}"
  input:
    backgroundColor: "{colors.porcelain}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
    height: "48px"
  counter-card:
    backgroundColor: "{colors.porcelain}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 16px 16px"
  drum-tile:
    backgroundColor: "{colors.drum-black}"
    textColor: "{colors.drum-digit}"
    rounded: "{rounded.drum}"
    width: "0.7em"
    height: "1.3em"
  header-plate:
    backgroundColor: "{colors.meter-blue}"
    textColor: "{colors.plate-ink}"
    typography: "{typography.plate}"
    padding: "8px 16px"
---

# Design System: Countsy

## Overview

**Creative North Star: "The Water-Meter Register"**

A counter is a utility meter read at a glance. Countsy sets every value as a row of black drum tiles with light digits on a cool enamel-grey ground, under a single meter-blue plate. The system is flat, outlined and instrumental: nothing is decorated, and every surface exists to make the number legible first.

Density is phone-first and calm. One card per counter, one number per card, a full-width minus and plus pair beneath. Dark mode is an instrument panel, not a recolor: the ground drops to near-black and the drum tiles invert to light tiles with dark digits.

**Key Characteristics:**
- Enamel-grey ground, one blue, near-black ink; no gradients, no shadows.
- Condensed uppercase labels over a plain humanist body face.
- Outlined, square-ish controls that fill with ink on press.
- Numbers as uniform drum digits, never colored per digit.
- Red appears only as a failed-save state.
- Motion is action feedback only; reaching a goal is the gauge filling to its brim.

## Colors

A cool, desaturated enamel palette with one blue and one reserved state red. Every pair is chosen for AA contrast.

### Primary
- **Meter Blue** (#1f5f8b): the header plate, unit labels, the primary button outline, focus rings, links, the gauge water, and the reached gauge outline. In dark mode the plate becomes Dark Plate (#1a4d70) while text accents lift to Dark Accent Sky (#73b4e0).

### Neutral
- **Enamel Grey** (#eceff1): page ground; also the digit color on drum tiles in light mode. Deliberately cool, not cream.
- **Porcelain** (#f8fafb): card, input, drawer and dialog surface.
- **Ink** (#14181c): body text, button outlines and fills on press.
- **Ink Muted** (#46515a): secondary text, goal line, empty states, input outlines, the gauge outline before the goal.
- **Hairline** (#b9c3ca): card borders and dividers.
- **Drum Black** (#0d1114): tile ground in light mode.
- **Dark Panel / Dark Surface / Dark Ink / Dark Ink Muted / Dark Hairline** (#101418 / #171c21 / #e6ebef / #9aa7b1 / #2f3a43): the dark-mode counterparts. Dark mode tiles are Dark Ink (#e6ebef) with Dark Panel digits.

### State
- **Fail Red** (#b3261e; dark #ff8f86): used for the failed-save message on a counter and the error boundary heading. Never decorative.

### Named Rules
**The Reserved Red Rule.** Red marks a failed save or load and nothing else. It is never an accent, a delete affordance, or a hover color.

**The One Blue Rule.** Meter blue is the only chromatic accent. Labels, primary action, focus and the plate share it.

**The Uniform Digit Rule.** All digits in a register share one color on one tile color. No highlighted last digit.

## Typography

**Display/Label Font:** Barlow Condensed (500, 600, 700; fallback Barlow, system sans)
**Body Font:** Barlow (400, 500, 600; fallback system sans)

**Character:** Stenciled, engineering-plate condensed capitals over a neutral grotesque body, with tabular numerals for the register.

### Hierarchy
- **Register** (Barlow 600, 74px, line-height 1, tabular): the drum digits. Steps down by digit count: 60px at 5 characters, 48px at 6, 38px at 7 or more.
- **Plate / Page title** (Condensed 700, 1.875rem, tracking 0.1em for the plate, 0.05em for page titles, uppercase): "Countsy" in the header and page headings.
- **Label** (Condensed 600, 1.25rem for counter titles, 1rem for form labels, 0.05em, uppercase, meter blue): counter titles, field labels.
- **Button** (Condensed 600, 1.125rem, 0.05em, uppercase).
- **Body** (Barlow 400, 1rem, 1.5): paragraphs, inputs at 1.125rem, drawer items at 1.125rem. Keep prose near 65ch.
- **Goal line** (Condensed 600, 1.125rem, uppercase, Ink Muted): "of N", "reached", "Archived".

### Named Rules
**The Plate Voice Rule.** Condensed uppercase is for names and controls (titles, labels, buttons, goal line). Sentences and messages are Barlow sentence case.

## Layout

Single column on phones; counters grid at two columns from 640px and three from 1024px with 16px gaps. Pages sit in a centered container capped at 64rem (max-w-5xl) with 16px side padding; forms cap at 36rem and sign-in at 28rem. Spacing runs on a 4px grid with 8, 12, 16 and 24px as the working steps. Touch targets are at least 48px, and the counter minus/plus pair is 50px tall, two equal columns with a 12px gap. The footer is a hairline-topped row of small muted links.

## Elevation & Depth

Flat. There are no shadows; the toast explicitly removes its shadow. Depth comes from tonal steps (ground, then porcelain card with a 1px hairline border) and from the dark drum tile set into a card. The drawer and dialogs separate from the page with a 40-50% black backdrop and a hairline border, not a shadow.

### Named Rules
**The Flat Instrument Rule.** Surfaces stay flat at every state; hover and press change fill, never elevation.

## Shapes

Barely-rounded plates: 2px corners on cards, buttons, inputs, drawer items and toasts, with 2px outlines on controls and 1px on cards. Drum tiles are 0.7em wide by 1.3em tall with a 0.06em corner and a 1px mid-line seam at 15% tile-ink, set with 3px gaps. The goal gauge is a 14px open-topped glass with 2px sides and a 3px rounded bottom. The favicon repeats the glass, two-thirds full, in white on a meter-blue 6px-rounded square.

## Components

### Buttons
- **Shape:** 2px corners, 2px outline, 48px minimum height, 8px 20px padding.
- **Default:** transparent with Ink outline and text, condensed uppercase.
- **Hover / Press:** fills with Ink and text flips to the page color (150ms color transition). Disabled drops to 50% opacity.
- **Primary:** same outline in Meter Blue, fills blue on hover/press. Used once per view (New counter, sign-in submit).
- **Icon button:** 48px square, Ink Muted glyph turning Ink on hover; on the plate it stays white.
- **Focus:** 3px Meter Blue outline with 2px offset (white on the plate).

### Inputs / Fields
- **Style:** Porcelain fill, 2px Ink Muted outline, 2px corners, 48px height, 1.125rem text.
- **Focus:** border and 3px outline go Meter Blue.
- **Error:** message in Ink, semibold, role alert; red is not used for field validation.

### Counter Card
Porcelain, 1px hairline, 2px corners. Top row: uppercase blue title (tap to rename inline), edit and archive icon buttons. Then the drum register, a goal line, then the minus/plus pair. When a goal is set, the goal gauge runs the full card height down the right edge, inset 16px top, right and bottom. A failed save shows "Not saved. The count was put back." in Fail Red, semibold.

### Drum Register (signature)
One tile per digit, minimum four digits, zero-padded, a minus sign gets its own tile. Only changed tiles roll (180ms ease-out, from 40% above with fade). Digits are hidden from assistive tech; a status span announces the value.

### Goal Gauge (signature)
A narrow measuring glass: open top with a lip, a brim line at 94% of its height marking the goal, and short marks at a quarter, half and three quarters of the goal. Water is Meter Blue at 85% with a solid 2px meniscus, and its height is count ÷ goal, from empty at zero or below up to the brim at the goal. Past the goal the water tops up to the rim. Water changes height over 180ms ease-out on each tap; the glass, lip and marks go from Ink Muted to Meter Blue when the goal is reached. Reaching the goal (the water hitting the brim) is the only celebration. Under reduced motion the level jumps. It is a `meter` for assistive tech, labelled "N of GOAL", with ", goal reached" added once reached.

### Navigation
Meter Blue header plate with the condensed wordmark, a theme toggle (sun/moon) and a menu icon, all white. The menu is a native modal dialog: an 20rem right-side Porcelain panel with a hairline left border, 18px items, items highlight to the page color on hover.

### Toasts
Porcelain, Ink text, 2px Ink Muted outline, 2px corners, no shadow.

## Do's and Don'ts

### Do:
- **Do** keep all digits in a register the same color on the same tile (#0d1114 with #eceff1; inverted in dark).
- **Do** use Meter Blue (#1f5f8b) as the only accent and Fail Red only for failed saves and loads.
- **Do** use outlined controls that fill with Ink on press, minimum 48px.
- **Do** set names, labels and buttons in Barlow Condensed uppercase and messages in Barlow.
- **Do** keep surfaces flat with 2px corners and hairline borders.
- **Do** limit motion to the 180ms digit roll, the 180ms gauge level change, and color transitions; render everything static under reduced motion.

### Don't:
- **Don't** use shadows, gradients, mascots, or the neon dark look of the earlier theme.
- **Don't** add a second celebration, streaks, badges or other decorative motion.
- **Don't** color digits individually or use red for emphasis or delete actions.
- **Don't** use cream or warm grounds; the enamel is cool.
