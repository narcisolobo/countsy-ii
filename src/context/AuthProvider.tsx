import type { User } from "@supabase/supabase-js";
import { type ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { supabase } from "@/lib/supabase-client";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("[Auth Event]:", event, session);

      switch (event) {
        case "INITIAL_SESSION":
          setUser(session?.user ?? null);
          setIsLoading(false);
          break;

        case "SIGNED_IN":
          setUser(session?.user ?? null);
          setIsLoading(false);
          if (location.pathname === "/sign-in") {
            navigate("/counters", { replace: true });
            toast.success("Signed in successfully!");
          }
          break;

        case "SIGNED_OUT":
          setUser(null);
          setIsLoading(false);
          toast.success("Signed out successfully.");
          navigate("/sign-in", { replace: true });
          break;

        case "TOKEN_REFRESHED":
        case "USER_UPDATED":
          setUser(session?.user ?? null);
          break;

        default:
          console.warn("Unhandled auth event:", event);
          break;
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate]);

  const value = {
    user,
    isSignedIn: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
