# Countsy

_Track anything. Count everything._

**[Live demo](https://countsy.cisocodes.com)**

![Countsy screenshot](./screenshot.png)

Countsy is a small web app for keeping named counters: glasses of water, finished chapters, boxes left in the stockroom. Each counter has a title, a current value and an optional goal. Sign in and your counters follow you across devices.

## Why I built it

A counter is the first example in every React tutorial. I wanted to see how far one could go if I treated it as a real product: real authentication, a real database with per-user access rules, and the unglamorous parts like loading states, failed requests and form validation. It was also a way to get comfortable with Supabase and to practice structuring a small app so that it stays easy to change.

## Features

- Create as many counters as you like
- Increment and decrement from the counter card; the number changes immediately and rolls back if the save fails
- Rename a counter in place, or open the edit page to change its title, value and goal
- Set an optional goal per counter
- Archive a counter, hide archived ones, and restore them later
- Sign in with a magic link sent to your email, or with Google
- Each user can only read and change their own counters, enforced by Postgres row level security
- Works on phones and desktops, with a theme switcher

## Tech stack

| Area         | Tools                                                                              |
| ------------ | ---------------------------------------------------------------------------------- |
| App          | React 19, TypeScript, Vite, React Router                                           |
| Data         | TanStack Query for fetching, caching and optimistic updates                        |
| Forms        | React Hook Form with Zod schemas                                                   |
| UI           | Tailwind CSS 4, DaisyUI, Lucide icons, react-hot-toast                             |
| Backend      | Supabase (Postgres with row level security, Auth with PKCE flow)                   |
| Hosting      | Vercel                                                                             |

## Getting started

You need Node.js, [pnpm](https://pnpm.io) and a free [Supabase](https://supabase.com) project.

1. Install dependencies:

   ```sh
   pnpm install
   ```

2. Create a `.env.local` file with your project's URL and publishable key (Project Settings, then API):

   ```sh
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
   ```

3. Create the `counters` table and its access rules in the Supabase SQL editor. The columns match [src/types/supabase.ts](src/types/supabase.ts):

   ```sql
   create table public.counters (
     id uuid primary key default gen_random_uuid(),
     user_id uuid default auth.uid() references auth.users (id) on delete cascade,
     title text not null default 'Counter',
     value integer default 0,
     goal integer,
     is_archived boolean default false,
     created_at timestamptz not null default now(),
     updated_at timestamptz default now()
   );

   alter table public.counters enable row level security;

   create policy "Users manage their own counters"
     on public.counters
     for all
     to authenticated
     using (user_id = auth.uid())
     with check (user_id = auth.uid());
   ```

4. In Authentication settings, add `http://localhost:5173/auth/callback` to the allowed redirect URLs. To use Google sign-in, enable the Google provider with your own OAuth credentials.

5. Start the dev server:

   ```sh
   pnpm dev
   ```

Other scripts: `pnpm build` type-checks and builds for production, `pnpm lint` runs ESLint, and `pnpm preview` serves the production build locally.

## License

Released under the [MIT License](./LICENSE.md).
