# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Everyday self-trackers: individuals keeping tallies of small things in their lives (glasses of water, finished chapters, boxes left in a stockroom). They check and update counters in quick glances, often on a phone, and expect their counters to follow them across devices after signing in.

## Product Purpose
Countsy lets a person keep named counters with a current value and an optional goal. Success is a one-tap increment that feels instant and trustworthy, and a counter list that is clear at a glance. It also serves as the author's exercise in treating a trivial idea as a real product (real auth, per-user data, loading and failure states, validation).

## Positioning
Radical simplicity: named counters, one-tap increment/decrement, an optional goal, archive and restore. No streaks, gamification, or social features. Unlike habit trackers it is a general-purpose number keeper.

## Operating Context
Sign in with a magic link sent by email or with Google (PKCE flow). Counters live in Supabase Postgres with row level security, so each user reads and changes only their own. Increments update optimistically and roll back if the save fails. Users can rename a counter inline or on an edit page, archive counters, hide archived ones, and restore them. A theme switcher is available.

## Capabilities and Constraints
- Stack is existing and in place: React 19, TypeScript, Vite, React Router, TanStack Query, React Hook Form with Zod, Tailwind CSS 4, DaisyUI, Lucide icons, react-hot-toast, Supabase, hosted on Vercel.
- Routes: landing, sign-in, auth callback, counters, edit counter, terms, privacy.
- Terminology: "counter", "goal", "archive".
- No ads, social, or gamification features exist; none are planned.

## Brand Commitments
Name "Countsy" and the tagline "Track anything. Count everything." appear in the README. A crow mascot asset exists at `src/assets/countsy-crow.png`; the user did not confirm it or the tagline as binding, so treat both as incumbent, not locked.

## Evidence on Hand
- Live demo: https://countsy.cisocodes.com
- `screenshot.png` at the repo root.
- No testimonials, user counts, or metrics exist; do not fabricate them.

## Product Principles
- Speed of the core action comes first: incrementing a counter must feel immediate.
- Stay simple: resist features that turn a counter into a habit or social product.
- Be honest about state: loading, failure, and rollback are visible, never silent.
- Data is private by default; each user sees only their own counters.

## Accessibility & Inclusion
WCAG AA is a hard requirement.
