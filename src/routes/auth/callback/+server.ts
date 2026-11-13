import { safeNext } from "#lib/server/safe-next.js";
import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

/**
 * Where magic links and Google send the user back. Finishes the PKCE sign-in:
 * trades the one-time code (plus the verifier cookie set when sign-in began)
 * for a session, which the hook's setAll writes as cookies.
 */
export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get("code");

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) redirect(303, safeNext(url.searchParams.get("next")));
  }

  // No code means Supabase or Google reported a problem (expired link,
  // cancelled consent), or the link was opened in a different browser than
  // the one that asked for it, so the verifier cookie is missing.
  redirect(303, "/sign-in?error=link");
};
