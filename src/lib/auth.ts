import toast from "react-hot-toast";
import { supabase } from "./supabase-client";

export async function handleSignOut(navigate: (path: string) => void) {
  const { error } = await supabase.auth.signOut();

  if (error) {
    toast.error("Oops! Logout failed.");
    console.error("Logout error:", error.message);
  } else {
    navigate("/sign-in");
  }
}
