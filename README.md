# Countsy

_Track anything. Count everything._

**[Live demo](https://countsy.cisocodes.com)**

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./docs/screenshots/counters-dark.jpg">
  <img alt="Countsy showing six counters on a light grey background, each with black drum-style digits and a narrow glass gauge filling toward its goal" src="./docs/screenshots/counters-light.jpg">
</picture>

Countsy is a small web app for keeping named counters: glasses of water, finished chapters, boxes left in the stockroom. Each counter has a title, a current value and an optional goal. Sign in and your counters follow you across devices.

## Why I built it

A counter is the first example in every framework tutorial. I wanted to see how far one could go if I treated it as a real product: real authentication, a real database with per-user access rules, and the unglamorous parts like loading states, failed requests and form validation.

The first version was a React single-page app. It worked, but it sent 183 kB of gzipped JavaScript to show a list of numbers, most of it libraries, and the list only appeared after a second request to the database. I rebuilt it in SvelteKit with Supabase called only from the server. The decision, the alternatives I considered and the before-and-after measurements are in [ADR 0001](./docs/adr/0001-sveltekit-with-server-side-supabase.md).

## Features

- Create as many counters as you like
- Increment and decrement from the counter card; the number changes immediately and is put back if the save fails
- Rename a counter in place, or open the edit page to change its title, description, value and goal
- Set an optional goal per counter; a measuring glass on the card fills toward it and tops out at the brim when you reach it
- Archive a counter, show archived ones, and restore or delete them
- Sign in with a magic link sent to your email, or with Google
- Each user can only read and change their own counters, enforced by Postgres row level security
- Forms are plain HTML forms, so counting and editing work even before the JavaScript loads
- Works on phones and desktops, with light and dark themes that follow your system setting

<img alt="Countsy on a phone-width screen, with counters stacked in a single column" src="./docs/screenshots/counters-phone.jpg" width="300">

## Performance

Measured on the live site with Lighthouse (mobile, simulated slow 4G), signed in with six counters:

| Counters page          | React version  | SvelteKit version |
| ---------------------- | -------------- | ----------------- |
| JavaScript (gzipped)   | 182 kB         | 57 kB             |
| Largest Contentful Paint | 1.8 s        | 1.1 s             |
| Cumulative Layout Shift | 0.111         | 0                 |
| Performance score      | 95             | 100               |

The counter list now arrives in the first HTML response, and none of the Supabase SDK reaches the browser. The [ADR](./docs/adr/0001-sveltekit-with-server-side-supabase.md) has the full numbers, including a layout shift caused by the web fonts and how it was fixed.

## Design

The look is borrowed from a water meter: each value sits in a row of drum tiles under a single meter-blue plate, on a flat enamel-grey ground with no gradients or shadows. Motion only acknowledges an action, and reaching a goal is shown by the glass filling to its brim. The full system (colors, type, components and the reasoning behind them) is in [DESIGN.md](./DESIGN.md).

## Tech stack

| Area    | Tools                                                                            |
| ------- | -------------------------------------------------------------------------------- |
| App     | SvelteKit 3 and Svelte 5, TypeScript, Vite                                       |
| Data    | Server load functions and form actions with `use:enhance`                        |
| UI      | Tailwind CSS 4, Barlow and Barlow Condensed, Lucide icons                        |
| Backend | Supabase (Postgres with row level security, Auth via `@supabase/ssr` on the server) |
| Hosting | Vercel                                                                           |

## Getting started

You need Node.js, [pnpm](https://pnpm.io), the [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started) and Docker, which the CLI uses to run Supabase locally.

1. Install dependencies:

   ```sh
   pnpm install
   ```

2. Start the local Supabase stack. This applies the migrations in [supabase/migrations](./supabase/migrations) and loads a demo user from [supabase/seed.sql](./supabase/seed.sql):

   ```sh
   supabase start
   ```

3. Create a `.env.local` file with the API URL and publishable key that `supabase status` prints:

   ```sh
   PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
   PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-local-publishable-key
   ```

4. Start the dev server and open http://localhost:5173:

   ```sh
   pnpm dev
   ```

5. Sign in with a magic link to `demo@countsy.test`. The email arrives in the local mail inbox (Mailpit) listed by `supabase status`. To try Google sign-in locally, add an `[auth.external.google]` section with your own OAuth credentials to [supabase/config.toml](./supabase/config.toml).

`supabase db reset` restores the seed data. Other scripts: `pnpm build` builds for production, `pnpm preview` serves that build, `pnpm check` type-checks, and `pnpm lint` runs Prettier and ESLint.

To deploy, create a Supabase project, push the migrations with `supabase db push`, and set the same two `PUBLIC_SUPABASE_*` variables on Vercel. In the project's Authentication settings, set the Site URL to your production address and add its `/auth/callback` to the allowed redirect URLs.

## License

Released under the [MIT License](./LICENSE.md).
