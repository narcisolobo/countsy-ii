import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
/** Combined quick taps stay small; anything bigger is not a tap. */
const MAX_STEP = 1000;
/** Matches the counters_title_check constraint. */
const TITLE_MAX = 24;

/**
 * Script requests (the card's fetch, use:enhance) ask for JSON and get data
 * back. A plain form post (no JavaScript) gets a fresh GET instead, so
 * refreshing the page can never submit the same action twice.
 */
function fromScript(request: Request) {
  return request.headers.get("accept")?.includes("application/json") ?? false;
}

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

    if (!fromScript(request)) redirect(303, "/counters");
    return { id, value };
  },

  /**
   * Adds a counter named "Counter N" (N = active counters + 1, as the React
   * app did). The page opens the new card in rename mode.
   */
  create: async ({ request, locals: { supabase } }) => {
    const { count } = await supabase
      .from("counters")
      .select("id", { count: "exact", head: true })
      .eq("is_archived", false);

    // user_id defaults to auth.uid(); RLS checks it on insert.
    const { data, error } = await supabase
      .from("counters")
      .insert({ title: `Counter ${(count ?? 0) + 1}` })
      .select("id")
      .single();

    if (error) return fail(500, { createFailed: true as const });
    if (!fromScript(request)) redirect(303, "/counters");
    return { created: data.id };
  },

  /** Renames a counter. Same rules as the column: 1–24 characters, trimmed. */
  rename: async ({ request, locals: { supabase } }) => {
    const form = await request.formData();
    const id = String(form.get("id") ?? "");
    const title = String(form.get("title") ?? "").trim();

    if (!UUID.test(id) || title.length < 1 || title.length > TITLE_MAX) {
      return fail(400, { id, renameFailed: true as const });
    }

    const { data, error } = await supabase
      .from("counters")
      .update({ title })
      .eq("id", id)
      .select("id");

    // No row back: not found, or not this user's counter (RLS hid it).
    if (error || data.length === 0) {
      return fail(error ? 500 : 404, { id, renameFailed: true as const });
    }
    if (!fromScript(request)) redirect(303, "/counters");
    return { id, title };
  },
};
