import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
/** Combined quick taps stay small; anything bigger is not a tap. */
const MAX_STEP = 1000;
/** Matches the counters_title_check constraint. */
const TITLE_MAX = 24;

/** `?show=archived` lists archived counters alongside active ones. */
function showingArchived(url: URL) {
  return url.searchParams.get("show") === "archived";
}

/** The list the user was looking at, keeping "Show archived". */
function listUrl(url: URL) {
  return showingArchived(url) ? "/counters?show=archived" : "/counters";
}

/**
 * Script requests (the card's fetch, use:enhance) ask for JSON and get data
 * back. A plain form post (no JavaScript) gets a fresh GET instead, so
 * refreshing the page can never submit the same action twice.
 */
function fromScript(request: Request) {
  return request.headers.get("accept")?.includes("application/json") ?? false;
}

/** Reads and checks the counter id every per-counter action sends. */
async function counterId(request: Request) {
  const form = await request.formData();
  const id = String(form.get("id") ?? "");
  return { form, id: UUID.test(id) ? id : null };
}

export const load: PageServerLoad = async ({ url, locals: { supabase } }) => {
  const showArchived = showingArchived(url);

  // No user filter needed: RLS only returns the caller's rows.
  let query = supabase
    .from("counters")
    .select("id, title, description, value, goal, is_archived")
    .order("created_at", { ascending: true });
  if (!showArchived) query = query.eq("is_archived", false);
  const { data, error } = await query;

  // Rendered as a failed-load message on the page rather than a bare 500, so
  // the header, menu and sign-out keep working.
  return { counters: error ? null : data, showArchived };
};

export const actions: Actions = {
  /**
   * Adds `delta` to a counter. The card sends a change, not a total, and the
   * database applies it atomically (increment_counter), so out-of-order
   * requests can't overwrite each other. Returns the stored value so the card
   * can show what the database actually holds.
   */
  step: async ({ request, url, locals: { supabase } }) => {
    const { form, id } = await counterId(request);
    const delta = Number(form.get("delta"));

    if (
      !id ||
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

    if (!fromScript(request)) redirect(303, listUrl(url));
    return { id, value };
  },

  /**
   * Adds a counter named "Counter N" (N = active counters + 1, as the React
   * app did). The page opens the new card in rename mode.
   */
  create: async ({ request, url, locals: { supabase } }) => {
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
    if (!fromScript(request)) redirect(303, listUrl(url));
    return { created: data.id };
  },

  /** Renames a counter. Same rules as the column: 1–24 characters, trimmed. */
  rename: async ({ request, url, locals: { supabase } }) => {
    const { form, id } = await counterId(request);
    const title = String(form.get("title") ?? "").trim();

    if (!id || title.length < 1 || title.length > TITLE_MAX) {
      return fail(400, { id, renameFailed: true as const });
    }

    const { data, error } = await supabase
      .from("counters")
      .update({ title })
      .eq("id", id)
      .eq("is_archived", false) // archived counters are read-only
      .select("id");

    // No row back: not found, or not this user's counter (RLS hid it).
    if (error || data.length === 0) {
      return fail(error ? 500 : 404, { id, renameFailed: true as const });
    }
    if (!fromScript(request)) redirect(303, listUrl(url));
    return { id, title };
  },

  archive: async (event) => setArchived(event, true),
  restore: async (event) => setArchived(event, false),

  /**
   * Deletes a counter for good. Only archived counters can be deleted: the
   * query asks for that, and the RLS delete policy enforces it regardless.
   */
  delete: async ({ request, url, locals: { supabase } }) => {
    const { id } = await counterId(request);
    if (!id) return fail(400, { id, changeFailed: "delete" as const });

    const { data, error } = await supabase
      .from("counters")
      .delete()
      .eq("id", id)
      .eq("is_archived", true)
      .select("title");

    if (error || data.length === 0) {
      return fail(error ? 500 : 404, { id, changeFailed: "delete" as const });
    }
    if (!fromScript(request)) redirect(303, listUrl(url));
    return { id, changed: "delete" as const, title: data[0].title };
  },
};

/** Archives or restores one of the caller's counters. */
async function setArchived(
  { request, url, locals: { supabase } }: Parameters<Actions[string]>[0],
  archived: boolean,
) {
  const change = archived ? ("archive" as const) : ("restore" as const);
  const { id } = await counterId(request);
  if (!id) return fail(400, { id, changeFailed: change });

  const { data, error } = await supabase
    .from("counters")
    .update({ is_archived: archived })
    .eq("id", id)
    .select("title");

  if (error || data.length === 0) {
    return fail(error ? 500 : 404, { id, changeFailed: change });
  }
  if (!fromScript(request)) redirect(303, listUrl(url));
  return { id, changed: change, title: data[0].title };
}
