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

/**
 * Latin font files to preload, as `family-weight`. The page is server-rendered,
 * so without a preload the fonts arrive after the first paint and the swap
 * shifts the layout (ADR 0001, Results). Only fonts the first screen uses are
 * listed: a preloaded font that goes unused costs bytes and a console warning.
 */
const FONTS_EVERYWHERE = [
  "barlow-400",
  "barlow-condensed-600",
  "barlow-condensed-700",
];
const FONTS_BY_ROUTE: Record<string, string[]> = {
  "/counters": ["barlow-600", "barlow-condensed-500"],
};

function preloadFont(filename: string, routeId: string | null): boolean {
  const match = /\/(barlow(?:-condensed)?)-latin-(\d+)-normal\.woff2$/.exec(
    filename,
  );
  if (!match) return false;
  const font = `${match[1]}-${match[2]}`;
  return (
    FONTS_EVERYWHERE.includes(font) ||
    (FONTS_BY_ROUTE[routeId ?? ""]?.includes(font) ?? false)
  );
}

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

  // `/` is the sign-in screen; the React app's /sign-in links still land.
  if (path === "/sign-in") redirect(308, `/${event.url.search}`);

  const isProtected = PROTECTED.some(
    (p) => path === p || path.startsWith(`${p}/`),
  );
  if (isProtected && !event.locals.user) redirect(303, "/");
  // GET only: a signed-in visitor skips the sign-in screen, but form posts
  // to `/` are never redirected away from their action.
  if (path === "/" && event.locals.user && event.request.method === "GET") {
    redirect(303, "/counters");
  }

  return resolve(event, {
    preload: (file) =>
      file.type === "js" ||
      file.type === "css" ||
      (file.type === "font" && preloadFont(file.filename, event.route.id)),
  });
};
