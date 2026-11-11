# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Everyday self-trackers, mostly on a phone: individuals keeping tallies of small things in their lives (glasses of water, finished chapters, boxes left in a stockroom). The author, for one, uses it a few times a week to count remaining refills on Brita pitchers whose indicator lights have died. Users check and update counters in quick glances, often on a phone, and expect their counters to follow them across devices after signing in.

## Product Purpose
Countsy lets a person keep named counters with a current value and an optional goal. Success is a one-tap increment that feels instant and trustworthy, and a counter list that is clear at a glance. It also serves as the author's exercise in treating a trivial idea as a real product (real auth, per-user data, loading and failure states, validation).

## Positioning
Radical simplicity: named counters, one-tap increment/decrement, an optional goal, archive and restore. No streaks, gamification, or social features. Unlike habit trackers it is a general-purpose number keeper.

## Operating Context
Sign in with a magic link sent by email or with Google (PKCE flow). Counters live in Supabase Postgres with row level security, so each user reads and changes only their own. Increments update optimistically and roll back if the save fails. Users can rename a counter inline or on an edit page, archive counters, hide archived ones, and restore them. A theme switcher is available.

## Capabilities and Constraints
- Stack is existing and in place: React 19, TypeScript, Vite, React Router, TanStack Query, React Hook Form with Zod, Tailwind CSS 4, DaisyUI, Lucide icons, react-hot-toast, Supabase, hosted on Vercel.
- Landing page is being reduced to a bare sign-in screen: a little more than one line of plain copy saying what the app does and how to use it, with no selling. Routes: landing, sign-in, auth callback, counters, edit counter, terms, privacy.
- Terminology: "counter", "goal", "archive".
- No ads, social, or gamification features exist; none are planned.

## Brand Commitments
Name "Countsy" and the tagline "Track anything. Count everything." are incumbent; the tagline is not confirmed as binding. The crow mascot (`src/assets/countsy-crow.png`) and the playful aesthetic it represents are a design anti-goal and will be removed. The dark theme (DaisyUI Synthwave) is also an anti-goal. The DaisyUI look must not be recognizable in light mode. The product is a plain counter app and does not pretend to be anything else.

## Evidence on Hand
- Live demo: https://countsy.cisocodes.com
- `screenshot.png` at the repo root.
- No testimonials, user counts, or metrics exist; do not fabricate them.

## Product Principles
- Speed of the core action comes first: incrementing a counter must feel immediate.
- Stay simple: resist features that turn a counter into a habit or social product.
- Be honest about state: loading, failure, and rollback are visible, never silent.
- Data is private by default; each user sees only their own counters.

## Redesign Intent
Complete visual redesign with light and dark modes. Primary task on the counters screen: read the number fast. Anti-goals: cute or playful, trendy-minimal SaaS polish, cold corporate dashboards, decorative motion, with two exceptions: motion that confirms an action (number changes, button presses, save/rollback feedback) is fine, and one celebratory Lottie animation is allowed when a counter reaches its goal. That is the only ornamental animation permitted. DaisyUI and Tailwind are not binding.

## Accessibility & Inclusion
WCAG AA is a hard requirement.
