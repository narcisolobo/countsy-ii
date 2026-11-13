import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  // No user filter needed: RLS only returns the caller's rows.
  const { data, error: dbError } = await supabase
    .from("counters")
    .select("id, title, description, value, goal, is_archived")
    .order("created_at", { ascending: true });

  if (dbError) error(500, "Couldn't load your counters.");
  return { counters: data };
};
