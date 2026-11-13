import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

/** POST only, so a link or prefetch can never sign anyone out. */
export const POST: RequestHandler = async ({ locals: { supabase } }) => {
  await supabase.auth.signOut();
  redirect(303, "/sign-in");
};
