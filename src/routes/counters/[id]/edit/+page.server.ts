import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
/** Column limits (counters_title_check, counters_description_check). */
const TITLE_MAX = 24;
const DESCRIPTION_MAX = 100;
/** Postgres integer range. */
const INT_MAX = 2147483647;

export const load: PageServerLoad = async ({
  params,
  locals: { supabase },
}) => {
  if (!UUID.test(params.id)) error(404, "Counter not found.");

  // RLS returns nothing for another user's counter, so that is a 404 too.
  const { data: counter } = await supabase
    .from("counters")
    .select("id, title, description, value, goal, is_archived")
    .eq("id", params.id)
    .maybeSingle();

  if (!counter) error(404, "Counter not found.");
  // Archived counters are read-only; send the user to where they live.
  if (counter.is_archived) redirect(303, "/counters?show=archived");
  return { counter };
};

type Field = "title" | "description" | "value" | "goal";

/** Parses a whole number from a form field; null when it isn't one. */
function wholeNumber(raw: string) {
  if (!/^-?\d+$/.test(raw)) return null;
  const n = Number(raw);
  return Math.abs(n) <= INT_MAX ? n : null;
}

export const actions: Actions = {
  default: async ({ request, params, locals: { supabase } }) => {
    const form = await request.formData();
    const values = {
      title: String(form.get("title") ?? "").trim(),
      description: String(form.get("description") ?? "").trim(),
      value: String(form.get("value") ?? "").trim(),
      goal: String(form.get("goal") ?? "").trim(),
    };
    const errors: Partial<Record<Field, string>> = {};

    if (values.title === "") errors.title = "Enter a title.";
    else if (values.title.length > TITLE_MAX)
      errors.title = `Keep the title to ${TITLE_MAX} characters.`;

    if (values.description.length > DESCRIPTION_MAX)
      errors.description = `Keep the description to ${DESCRIPTION_MAX} characters.`;

    const value = wholeNumber(values.value);
    if (value === null) errors.value = "Enter a whole number, like 12 or -3.";

    const goal = values.goal === "" ? null : wholeNumber(values.goal);
    if (values.goal !== "" && (goal === null || goal < 1))
      errors.goal = "Enter a whole number above 0, or leave it empty.";

    if (Object.keys(errors).length > 0) {
      return fail(400, { values, errors });
    }

    const { data, error: dbError } = await supabase
      .from("counters")
      .update({
        title: values.title,
        // Empty means "no description": the column stores null, never "".
        description: values.description === "" ? null : values.description,
        value: value!,
        goal,
      })
      .eq("id", params.id)
      .eq("is_archived", false) // archived counters are read-only
      .select("id");

    if (dbError || data.length === 0) {
      return fail(dbError ? 500 : 404, { values, saveFailed: true as const });
    }

    redirect(303, "/counters");
  },
};
