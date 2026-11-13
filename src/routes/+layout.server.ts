import type { LayoutServerLoad } from "./$types";

// Only what the header needs; the session itself never leaves the server.
export const load: LayoutServerLoad = ({ locals }) => ({
  signedIn: locals.user !== null,
});
