import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ url }) => ({
  linkError: url.searchParams.get("error") === "link",
});

export const actions: Actions = {
  email: async ({ request, url, locals: { supabase } }) => {
    const email = String((await request.formData()).get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return fail(400, { email, message: "Enter a valid email address." });
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${url.origin}/auth/callback` },
    });
    if (error) {
      return fail(error.status === 429 ? 429 : 500, {
        email,
        message:
          error.status === 429
            ? "Too many sign-in emails. Wait a minute and try again."
            : "Couldn't send the email. Try again.",
      });
    }
    return { sent: email };
  },

  google: async ({ url, locals: { supabase } }) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${url.origin}/auth/callback` },
    });
    if (error || !data.url) {
      return fail(500, { message: "Google sign-in is unavailable right now." });
    }
    redirect(303, data.url);
  },
};
