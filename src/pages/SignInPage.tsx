import { useState } from "react";
import GoogleLogo from "@/assets/google-logo.svg";
import { supabase } from "@/lib/supabase-client";
import styles from "@/styles/google.module.css";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSignIn(e: React.SubmitEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (error) {
      setMessage("Oops! Something went wrong: " + error.message);
    } else {
      setMessage("Check your email for a magic link!");
    }
  }

  async function handleSignInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Google sign-in error:", error.message);
    }
  }

  return (
    <div className="bg-page flex min-h-[70vh] items-center justify-center p-4">
      <div className="flex max-w-sm flex-col">
        <div className="bg-surface border-line rounded-lg border">
          <div className="p-6">
            <h1 className="text-center text-2xl font-semibold">
              Sign in to Countsy
            </h1>
            <form onSubmit={handleSignIn} className="mt-4 space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium" htmlFor="email">
                  <span>Email</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="ui-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="ui-btn ui-btn-primary w-full"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Magic Link"}
              </button>
              {message && (
                <div className="text-ok mt-2 text-center text-sm">
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="text-ink-muted my-4 flex items-center gap-3 text-sm">
          <span className="bg-line h-px flex-1"></span>OR
          <span className="bg-line h-px flex-1"></span>
        </div>
        <button
          className={styles["gsi-material-button"]}
          onClick={handleSignInWithGoogle}
        >
          <div className={styles["gsi-material-button-state"]}></div>
          <div className={styles["gsi-material-button-content-wrapper"]}>
            <div className={styles["gsi-material-button-icon"]}>
              <img src={GoogleLogo} alt="Sign in with Google" />
            </div>
            <span className={styles["gsi-material-button-contents"]}>
              Sign in with Google
            </span>
            <span style={{ display: "none" }}>Sign in with Google</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default SignInPage;
