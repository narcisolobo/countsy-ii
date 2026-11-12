---
status: proposed
date: 2026-11-12
---

# Rewrite in SvelteKit, with Supabase only on the server

Countsy sends 183 kB of gzipped JavaScript (622 kB minified, all in one chunk) to show a list of counters and change one number. Most of it is libraries, not app code. We will rebuild the app in SvelteKit and call Supabase only from server code, so the browser no longer downloads the Supabase SDK. Pages will also arrive from the server with the counter list already filled in.

## Baseline

Measured on `main` at `91e10bc` from the production build's sourcemap (minified sizes):

| Package | Size |
|---|---|
| react-dom + react | 182 kB |
| Supabase (auth 91, realtime 29, phoenix 24, storage 21, postgrest 15, core 9, iceberg 5) | ~215 kB |
| zod | 62 kB |
| react-router | 39 kB |
| @tanstack/query-core | 32 kB |
| react-hook-form | 26 kB |
| App source | 42 kB |

Some of this pays for nothing. Zod validates one field, a non-empty title. The app never uses Supabase realtime or storage, but `createClient` bundles them anyway.

Lighthouse (mobile) for the live demo, measured 2026-11-12 against `/sign-in` (main @ 91e10bc). Lighthouse 12.8.2 with its default mobile settings (simulated slow 4G, 4× CPU slowdown). Median of three runs:

| Metric | Value |
|---|---|
| Performance | 98 |
| First Contentful Paint | 1.8 s |
| Largest Contentful Paint | 1.8 s |
| Total Blocking Time | 0 ms |
| Cumulative Layout Shift | 0 |
| Speed Index | 1.8 s |
| JS transferred | 182 kB (of 257 kB total) |
| Unused JS (Lighthouse estimate) | 125 kB |

Accessibility 100, Best Practices 100, SEO 92 (the only failure is a missing `rel=canonical`). The scores are already high, so the main gains will show up in bytes: about two thirds of the JS sent to the sign-in page goes unused.

The same settings were used for `/counters`, signed in to the demo account with a cold HTTP cache (median of three runs):

| Metric | Value |
|---|---|
| Performance | 95 |
| First Contentful Paint | 1.8 s |
| Largest Contentful Paint | 1.8 s |
| Total Blocking Time | 0 ms |
| Cumulative Layout Shift | 0.111 |
| Speed Index | 1.8 s |
| JS transferred | 182 kB (of 301 kB total) |
| Unused JS (Lighthouse estimate) | 115 kB |

Accessibility 100, Best Practices 100, SEO 92. CLS is just over Google's 0.1 "good" threshold. Most of it (0.084) comes from the footer moving down when the counter list replaces the loading spinner, which is a direct result of fetching data after the page renders. Late web fonts cause the rest. Server-rendering the list should remove the larger shift.

## Considered options

- **Trim dependencies and keep React.** Remove zod and use only the Supabase modules the app needs, then split the bundle by page. That gets the first load to an estimated 110–120 kB gzipped with little risk. Rejected because the client would still hold the Supabase session and fetch data after the page renders, so the loading spinner stays. It improves size but leaves the architecture as it is.
- **Preact via `preact/compat`.** Saves roughly 45–50 kB gzipped and needs almost no code changes. Rejected because React 19 features and the React Compiler may not work smoothly with it. It would also only make the framework smaller and leave Supabase, the largest dependency, untouched.
- **React Router framework mode, with Supabase on the server.** The same server-side data approach as the chosen option, built on a router the app already uses. Estimated at 70–80 kB gzipped. A strong runner-up; React's runtime is the cost that remains.
- **htmx or a fully server-rendered app.** Rejected because an increment must feel instant and roll back visibly if the save fails. That needs some state in the browser, which is awkward to build in htmx.
- **SvelteKit with Supabase on the server (chosen).** Svelte compiles components to small JavaScript with no virtual DOM. Form actions with `use:enhance` handle saving (and still work before JavaScript loads), so React Query and react-hook-form become unnecessary. The built-in `tweened`, `spring` and transitions cover the number drum and the goal celebration. Estimated at 25–35 kB gzipped for the counters page.

## Consequences

- **Every increment goes through the server.** Requests go browser → Vercel function → Supabase instead of straight to Supabase. Optimistic updates hide the extra time, but a rollback shows up a little later. Put the Vercel function in the same region as the Supabase project.
- **Row level security still applies.** The server creates its Supabase client from the user's session cookie, so queries run as that user. The policies don't change.
- **The auth callback becomes a server endpoint.** It finishes the PKCE sign-in and sets the session cookie. Sessions move from localStorage to cookies, so everyone signs in once more after the switch.
- **Deployment changes.** Delete `vercel.json`: its catch-all redirect to `/` would break server routes. Switch Vercel's framework preset to SvelteKit. Rename `VITE_SUPABASE_*` to `PUBLIC_SUPABASE_*`. Add the preview domains to Supabase's allowed redirect URLs.
- **No database changes during the migration.** That keeps rollback simple: revert the merge commit and Vercel redeploys the React app.
- **Less React work in the portfolio.** Countsy stops being a React app. This is a deliberate trade, and the measurements above are the reason for it.

## Results

*To be filled in after the switch: JS sent per page, Lighthouse (mobile), and time until the counter list appears on throttled 4G, each compared with the baseline.*
