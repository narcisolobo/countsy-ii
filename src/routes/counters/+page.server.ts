import type { PageServerLoad } from "./$types";

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
