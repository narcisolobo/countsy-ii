---
status: accepted
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
- **SvelteKit 3 (Svelte 5) with Supabase on the server (chosen).** Svelte compiles components to small JavaScript with no virtual DOM. Form actions with `use:enhance` handle saving (and still work before JavaScript loads), so React Query and react-hook-form become unnecessary. The built-in `Tween`, `Spring` and transitions cover the number drum and the goal celebration. Estimated at 25–35 kB gzipped for the counters page.

## Consequences

- **Every increment goes through the server.** Requests go browser → Vercel function → Supabase instead of straight to Supabase. Optimistic updates hide the extra time, but a rollback shows up a little later. Put the Vercel function in the same region as the Supabase project.
- **Row level security still applies.** The server creates its Supabase client from the user's session cookie, so queries run as that user.
- **The auth callback becomes a server endpoint.** It finishes the PKCE sign-in and sets the session cookie. Sessions move from localStorage to cookies, so everyone signs in once more after the switch. Magic links use the `?code=` flow rather than `token_hash`, because new free-plan projects on Supabase's default email sender can't customize email templates.
- **Deployment changes.** Replace `vercel.json`'s catch-all redirect to `/`, which would break server routes, with `"framework": "sveltekit-1"`. That setting overrides the dashboard's Vite preset, so the preset needs no manual switch at cutover. Rename `VITE_SUPABASE_*` to `PUBLIC_SUPABASE_*`. Add the preview domains to Supabase's allowed redirect URLs.
- **The Svelte app gets a new Supabase project.** The original plan was to leave the database alone. Instead, the old `playground` project turned out to hold another app's leftover schema and a migration with no file behind it. So the Svelte app uses a new project, `countsy`, built only from `supabase/migrations/`, and the schema was tightened along the way (stricter constraints, a description column, delete only after archiving). `playground` keeps serving the React app untouched until cutover, so rollback is still "revert the merge commit". Counts are not migrated; the only user re-enters them by hand, and anything entered in the new app after cutover would not survive a rollback. Delete `playground` once the React app is gone.
- **Less React work in the portfolio.** Countsy stops being a React app. This is a deliberate trade, and the measurements above are the reason for it.

## Results

### JavaScript sent per page

Measured on 2026-11-13 from a production build of `svelte-rewrite` (9bbb0b0). Each figure is the page's chunks and their static imports, plus what every page loads: the client entry and router, the root layout and the root error page. Sizes are gzipped at level 9.

| Page | Gzipped | Minified | Change from 183 kB |
| --- | --- | --- | --- |
| `/` (sign-in) | 47 kB | 120 kB | −74% |
| `/counters` | 52 kB | 132 kB | −72% |
| `/counters/[id]/edit` | 49 kB | 122 kB | −73% |
| `/privacy` | 45 kB | 115 kB | −75% |

All client JavaScript in the build comes to 59 kB gzipped. None of it is Supabase code: the SDK runs only on the server.

The counters page came in above the 25–35 kB estimate. About 35 kB of every page is the framework itself: the Svelte runtime is 19.5 kB and SvelteKit's client router is 15.7 kB. The estimate counted the components but not that floor. The empty page from build step 1 already shipped 32 kB. On top of the floor, the root layout and shared components add about 10 kB, and the counters page adds 7 kB of its own.

### Lighthouse (mobile)

Measured on 2026-11-13 against the production deployment (main @ 34a28ad), with the settings and method used for the baseline: Lighthouse 12.8.2, default mobile throttling, median of three runs. `/counters` was signed in to the demo account, which holds the same six counters as the baseline run, with the HTTP cache cleared before each run. `/` (the sign-in screen, which replaces `/sign-in`) was run in a fresh, signed-out Chrome.

| Metric | `/` (was `/sign-in`) | `/counters` |
|---|---|---|
| Performance | 100 (was 98) | 94 (was 95) |
| First Contentful Paint | 1.1 s (was 1.8 s) | 1.1 s (was 1.8 s) |
| Largest Contentful Paint | 1.1 s (was 1.8 s) | 1.1 s (was 1.8 s) |
| Total Blocking Time | 0 ms (was 0) | 0 ms (was 0) |
| Cumulative Layout Shift | 0 (was 0) | 0.150 (was 0.111) |
| Speed Index | 1.1 s (was 1.8 s) | 1.1 s (was 1.8 s) |
| JS transferred | 52 kB of 129 kB (was 182 of 257) | 57 kB of 179 kB (was 182 of 301) |
| Unused JS (Lighthouse estimate) | 0 (was 125 kB) | 0 (was 115 kB) |

JS transferred is a little higher than the build figures above because it counts HTTP overhead. Lighthouse no longer finds any unused JavaScript to flag.

The counter list is now part of the first paint, so on `/counters` the time until the list appears equals First Contentful Paint: 1.1 s on throttled 4G. On the React app the list appeared only after the Supabase request returned.

Layout shift on `/counters` got worse, and the spinner is not the reason. The shift from the list replacing the spinner is gone. What remains comes from the web fonts: the five Barlow files arrive at about 450 ms, after the server-rendered grid has painted in the fallback font, and the swap moves the cards. The three runs scored 0, 0.180 and 0.150; the run with 0 was the one where the fonts arrived before the first paint. Preloading the fonts the first screen uses, or matching the fallback font's metrics, should remove most of it. That is follow-up work.
