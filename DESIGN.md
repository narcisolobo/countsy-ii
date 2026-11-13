---
name: Countsy
description: "A plain counter app set as a water-meter register: enamel ground, black drum tiles, meter blue."
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
  button-icon:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.sm}"
    size: "48px"
  button-icon-hover:
    textColor: "{colors.ink}"
  link:
    textColor: "{colors.meter-blue}"
  confirm-dialog:
    backgroundColor: "{colors.porcelain}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "24px"
    width: "28rem"
  form-card:
    backgroundColor: "{colors.porcelain}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "24px"
    width: "36rem"
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
- **Browser surfaces:** text selection is the accent with page-colored text, and the input and text-area caret is the accent, so even the browser's own marks stay on palette.

### Neutral
- **Enamel Grey** (#eceff1): page ground; also the digit color on drum tiles in light mode. Deliberately cool, not cream.
- **Porcelain** (#f8fafb): card, input, drawer and dialog surface.
- **Ink** (#14181c): body text, button outlines and fills on press.
- **Ink Muted** (#46515a): secondary text, goal line, empty states, input outlines, the gauge outline before the goal.
- **Hairline** (#b9c3ca): card borders and dividers.
- **Drum Black** (#0d1114): tile ground in light mode.
- **Dark Panel / Dark Surface / Dark Ink / Dark Ink Muted / Dark Hairline** (#101418 / #171c21 / #e6ebef / #9aa7b1 / #2f3a43): the dark-mode counterparts. Dark mode tiles are Dark Ink (#e6ebef) with Dark Panel digits.

### State
- **Fail Red** (#b3261e; dark #ff8f86): used only for failed-save and failed-load messages, in semibold Barlow: a count or rename that was put back, a counter that couldn't be added, archived, restored or deleted, an edit that wasn't saved, a list that didn't load. Never decorative; the error page heading is Ink.

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
- **Label** (Condensed 600, 1.25rem for counter titles and dialog headings, 1rem for form labels, 0.05em, uppercase, meter blue): counter titles, confirm dialog headings, field labels.
- **Button** (Condensed 600, 1.125rem, 0.05em, uppercase).
- **Body** (Barlow 400, 1rem, 1.5): paragraphs, inputs at 1.125rem, drawer items at 1.125rem. Keep prose near 65ch. Counter descriptions use snug leading (1.375); the footer and the "OR" divider step down to 0.875rem.
- **Goal line** (Condensed at its lightest loaded weight, 500, 1.125rem, 0.05em, uppercase, Ink Muted): "of N"; the words "reached" and "Archived" step up to 600.

### Named Rules
**The Plate Voice Rule.** Condensed uppercase is for names and controls (titles, labels, buttons, goal line). Sentences and messages are Barlow sentence case.

## Layout

Single column on phones; counters grid at two columns from 640px and three from 1024px with 16px gaps. Pages sit in a centered container capped at 64rem (max-w-5xl) with 16px side padding; forms cap at 36rem and sign-in at 28rem. Spacing runs on a 4px grid with 8, 12, 16 and 24px as the working steps. Touch targets are at least 48px, and the counter minus/plus pair is 50px tall, two equal columns with a 12px gap. The footer is a hairline-topped row of small muted links.

The page shell is a full-height column (header, main, footer), so the footer sits at the bottom of short pages; the header contents and the footer row align with the same 64rem page container. The sign-in screen centres itself vertically in the main area. A page heading row puts the condensed title on the left and its actions on the right, wrapping beneath on narrow screens.

## Elevation & Depth

Flat. There are no shadows. Depth comes from tonal steps (ground, then porcelain card with a 1px hairline border) and from the dark drum tile set into a card. The drawer and dialogs separate from the page with a 40-50% black backdrop and a hairline border, not a shadow: 40% behind the menu drawer, 50% behind the confirm dialog. The only shadow on screen is the Google sign-in button's own hover shadow, which belongs to Google's branding (see Components), not to this system.

### Named Rules
**The Flat Instrument Rule.** Surfaces stay flat at every state; hover and press change fill, never elevation.

## Shapes

Barely-rounded plates: 2px corners on cards, buttons, inputs, drawer items and dialogs, with 2px outlines on controls and on the confirm dialog, and 1px on cards and the edit form card. Drum tiles are 0.7em wide by 1.3em tall with a 0.06em corner and a 1px mid-line seam at 15% tile-ink, set with 3px gaps. The goal gauge is a 14px open-topped glass with 2px sides and a 3px rounded bottom. The favicon repeats the glass, two-thirds full, in white on a meter-blue 6px-rounded square.

## Components

### Buttons
- **Shape:** 2px corners, 2px outline, 48px minimum height, 8px 20px padding.
- **Default:** transparent with Ink outline and text, condensed uppercase.
- **Hover / Press:** fills with Ink and text flips to the page color (150ms color transition). Disabled drops to 50% opacity.
- **Primary:** same outline in Meter Blue, fills blue on hover/press. Used once per view (New counter, sign-in submit, Save on the edit page, the confirm action in a dialog).
- **With an icon:** the glyph leads the label with an 8px gap (Save, Archive on the edit page).
- **Icon button:** 48px square, Ink Muted glyph turning Ink on hover; on the plate it stays white.
- **Focus:** 3px Meter Blue outline with 2px offset (white on the plate).

### Inputs / Fields
- **Style:** Porcelain fill, 2px Ink Muted outline, 2px corners, 48px height, 1.125rem text.
- **Focus:** border and 3px outline go Meter Blue.
- **Labelled:** a condensed meter-blue label sits 4px above each field; fields stack 16px apart.
- **Text area:** the same field at 96px minimum height, snug leading, vertical resize only.
- **Numeric:** tabular numerals.
- **Error:** message in Ink, semibold, directly under the field and tied to it for assistive tech; red is not used for field validation.

### Text Link
Meter Blue, underlined with a 2px offset; the underline drops on hover. In page copy it sits inline. As page navigation ("Back to counters", above the edit heading) it is 48px tall with a leading 20px arrow. Footer links are the quiet variant: Ink Muted, underlined, turning Ink on hover.

### Counter Card
Porcelain, 1px hairline, 2px corners. The title row spans the full card width on every card: the uppercase blue title fills it, followed by edit (pencil) and archive icon buttons, 48px targets with 22px glyphs, so the icons line up down the list. An optional description sits under the title in Barlow body, Ink Muted, snug leading, clamped to two lines. Titles run 1 to 24 characters and wrap rather than truncate; descriptions run up to 100. Below the title row come the drum register, a goal line, then the minus/plus pair, pinned to the card's foot so a row of cards lines up its controls. When a goal is set, the goal gauge starts below the title row and runs beside the register, goal line and minus/plus pair, inset 12px top and 16px right and bottom. A failed save shows "Not saved. The count was put back." in Fail Red, semibold.

- **Goal line:** "of N", then " · reached" once the goal is met, or "Archived" on an archived card. With nothing to say it takes no room on phones; from 640px up it keeps its 24px slot so cards in a grid row stay aligned.
- **Inline rename:** the title is a button at least 48px tall. Activating it turns it into an input styled like the title (the standard field with condensed 1.25rem semibold uppercase text), text selected. Enter saves, Escape or leaving the field cancels. The new title shows at once; an empty title says "Enter a title." in Ink semibold, and a failed save says "Not saved. The title was put back." in Fail Red. A newly added counter opens in rename mode.
- **Archived:** read-only. The title is plain text with no rename, edit or archive icons, the goal line says "Archived", and outlined Restore and Delete buttons take the minus/plus slot (same 50px pair, 12px gap). Delete asks first.

### Drum Register (signature)
One tile per digit, minimum four digits, zero-padded, a minus sign gets its own tile. Only changed tiles roll (180ms ease-out, from 40% above with fade). Digits are hidden from assistive tech; a status span announces the value.

### Goal Gauge (signature)
A narrow measuring glass: open top with a lip, a brim line at 94% of its height marking the goal, and short marks at a quarter, half and three quarters of the goal. Water is Meter Blue at 85% with a solid 2px meniscus, and its height is count ÷ goal, from empty at zero or below up to the brim at the goal. Past the goal the water tops up to the rim. Water changes height over 180ms ease-out on each tap; the glass, lip and marks go from Ink Muted to Meter Blue when the goal is reached. Reaching the goal (the water hitting the brim) is the only celebration. Under reduced motion the level jumps. It is a `meter` for assistive tech, labelled "N of GOAL", with ", goal reached" added once reached.

### Navigation
Meter Blue header plate with the condensed wordmark, a theme toggle and, when signed in, a menu icon, all white. The toggle shows a moon in light mode and a sun in dark (the icon is chosen by CSS, so the first paint is right). Signed out there is no menu. The menu is a native modal dialog: an 20rem right-side Porcelain panel with a hairline left border, 18px items, items highlight to the page color on hover. It holds Counters and Sign out.

The footer is a hairline-topped row aligned with the page container: copyright on the left, GitHub, Privacy and Terms links on the right, all 0.875rem Ink Muted.

### Counters Header
The page heading "Counters" with its actions on the far side: an outlined "Show archived" (or "Hide archived") link styled as a button, then "New counter" as the view's one primary button. New counters come only from that button; there is no dashed "new counter" tile in the grid. An empty list says "No counters yet. Use New counter to start counting." in Ink Muted.

### Status Line
After an archive, restore or delete, the card that had focus is gone or rebuilt, so a short Ink semibold sentence above the grid takes focus and says what happened ("Coffee cups deleted."). It draws no focus ring of its own.

### Confirm Dialog
For archive and delete. A native modal dialog, centred, up to 28rem wide: Porcelain surface, 2px hairline border, 2px corners, 24px padding, a 50% black backdrop, no shadow. The heading is the condensed meter-blue label at 1.25rem ("Archive this counter?"); the body is Barlow with the counter's name in semibold. Actions sit at the bottom right: outlined Cancel, which takes focus first so a stray Enter never confirms, then the confirm action as the primary button. Delete copy says the counter and its count will be deleted and that this can't be undone. Delete is not red (Reserved Red Rule).

### Edit Form
"Back to counters" text link above the "Edit counter" heading, then a form card capped at 36rem: Porcelain, 1px hairline, 2px corners, 16px padding on phones and 24px from 640px. Labelled fields for Title, Description (optional, a text area), Value and Goal (optional, both numeric). The actions row puts Save (primary, with its icon) first and Archive (outlined, with its icon, asking first) on the far side.

### Sign-in
Centred in the page and capped at 28rem: the "Sign in" heading, one paragraph of Ink Muted copy, the email field, a full-width primary "Email me a sign-in link", an "OR" divider (small Ink Muted capitals between two hairlines), then the Google button. Results and problems appear as Ink semibold sentences.

### Error Page
The condensed uppercase page heading ("Not found" or "Something went wrong") in Ink, one Ink Muted sentence, then an outlined "Back to Countsy" button.

### Google Sign-in Button (sanctioned exception)
The one element outside the system. Google's sign-in branding guidelines require its own button design, so it keeps Google's colors, type and shape rather than the system's: in light mode a white fill, a #747775 1px border, #1f1f1f text in Roboto 500 at 14px, 4px corners, a soft hover shadow and a #303030 state layer; in dark mode a #131314 fill, a #8e918f border and #e3e3e3 text and state layer. It is full width and 48px tall, and its focus ring is the system's 3px accent outline. These colors stay out of the palette and must not spread to any other element. Do not "fix" this button to match the system.

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
- **Don't** restyle the Google sign-in button to the system, or borrow its colors, Roboto or shadow anywhere else.
