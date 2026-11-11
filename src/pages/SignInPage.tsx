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
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-8">
      <div className="flex flex-col">
        <div>
          <div>
            <h1 className="font-label text-3xl font-bold tracking-wider uppercase">
              Countsy
            </h1>
            <p className="text-ink-muted mt-2">
              Countsy keeps a running count of anything you want to track.
              Create a counter, tap plus or minus as the number changes, and set
              a goal if you want one.
            </p>
            <form onSubmit={handleSignIn} className="mt-6 space-y-4">
              <div className="flex flex-col gap-1">
                <label className="ui-label" htmlFor="email">
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
                {loading ? "Sending..." : "Email me a sign-in link"}
              </button>
              {message && (
                <div role="status" className="text-ink font-semibold">
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
