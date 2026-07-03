import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { supabase } from "@/lib/supabase-client";

function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session) {
        toast.error("Sign-in failed or session missing.");
        navigate("/sign-in");
      } else {
        toast.success("Signed in successfully!");
        navigate("/counters");
      }
    };

    checkSession();
  }, [navigate]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
      <span className="ml-2">Signing you in...</span>
    </div>
  );
}

export default AuthCallbackPage;
