import { type Database } from "./supabase";

export type Counter = Database["public"]["Tables"]["counters"]["Row"];
export type NewCounter = Database["public"]["Tables"]["counters"]["Insert"];
export type UpdateCounter = Database["public"]["Tables"]["counters"]["Update"];
