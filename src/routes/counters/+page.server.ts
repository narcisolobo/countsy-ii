import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
/** Combined quick taps stay small; anything bigger is not a tap. */
const MAX_STEP = 1000;

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  // No user filter needed: RLS only returns the caller's rows.
  // Archived counters stay hidden until slice 4 adds "Show archived".
  const { data, error } = await supabase
    .from("counters")
    .select("id, title, description, value, goal, is_archived")
    .eq("is_archived", false)
    .order("created_at", { ascending: true });

  // Rendered as a failed-load message on the page rather than a bare 500, so
  // the header, menu and sign-out keep working.
  return { counters: error ? null : data };
};

export const actions: Actions = {
  /**
   * Adds `delta` to a counter. The card sends a change, not a total, and the
   * database applies it atomically (increment_counter), so out-of-order
   * requests can't overwrite each other. Returns the stored value so the card
   * can show what the database actually holds.
   */
  step: async ({ request, locals: { supabase } }) => {
    const form = await request.formData();
    const id = String(form.get("id") ?? "");
    const delta = Number(form.get("delta"));

    if (
      !UUID.test(id) ||
      !Number.isInteger(delta) ||
      delta === 0 ||
      Math.abs(delta) > MAX_STEP
    ) {
      return fail(400, { id, failed: true as const });
    }

    const { data: value, error } = await supabase.rpc("increment_counter", {
      counter_id: id,
      delta,
    });

    // null: not found, or not this user's counter (RLS hid it).
    if (error || value === null) {
      return fail(error ? 500 : 404, { id, failed: true as const });
    }

    // A plain form post (no JavaScript) gets a fresh GET, so refreshing the
    // page can't submit the tap a second time. The card's script asks for
    // JSON and gets the stored value instead.
    if (!request.headers.get("accept")?.includes("application/json")) {
      redirect(303, "/counters");
    }
    return { id, value };
  },
};
