// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Database } from "#lib/types/supabase.js";
import type { SupabaseClient } from "@supabase/supabase-js";

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      /** Server-only client acting as the signed-in user (or anon). */
      supabase: SupabaseClient<Database>;
      /** Set from verified JWT claims in hooks.server.ts; null when signed out. */
      user: { id: string; email: string | null } | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
