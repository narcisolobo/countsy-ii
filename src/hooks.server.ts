import {
  PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  PUBLIC_SUPABASE_URL,
} from "$app/env/public";
import type { Database } from "#lib/types/supabase.js";
import { createServerClient } from "@supabase/ssr";
import { redirect } from "@sveltejs/kit";
import type { Handle } from "@sveltejs/kit/hooks";

/** Routes that need a signed-in user. */
const PROTECTED = ["/counters"];

export const handle: Handle = async ({ event, resolve }) => {
  // One client per request, acting as whoever the session cookie says. RLS
  // does the rest. The browser never gets a Supabase client (ADR 0001), so
  // the auth cookies can be httpOnly.
  event.locals.supabase = createServerClient<Database>(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll: () => event.cookies.getAll(),
        setAll: (cookiesToSet, headers) => {
          for (const { name, value, options } of cookiesToSet) {
            event.cookies.set(name, value, {
              ...options,
              path: "/",
              httpOnly: true,
            });
          }
          // no-store headers so a refreshed session is never cached.
          if (Object.keys(headers).length > 0) event.setHeaders(headers);
        },
      },
    },
  );

  // getClaims verifies the JWT (getSession would not) and refreshes an
  // expired session. Doing it here, before resolve, means refreshed cookies
  // are written before any page starts rendering.
  const { data, error } = await event.locals.supabase.auth.getClaims();
  const claims = error ? null : data?.claims;
  event.locals.user = claims
    ? { id: claims.sub, email: claims.email ?? null }
    : null;

  const path = event.url.pathname;
  const isProtected = PROTECTED.some(
    (p) => path === p || path.startsWith(`${p}/`),
  );
  if (isProtected && !event.locals.user) redirect(303, "/sign-in");
  if (path === "/sign-in" && event.locals.user) redirect(303, "/counters");

  return resolve(event);
};
