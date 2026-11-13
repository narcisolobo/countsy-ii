<script lang="ts">
  import { enhance } from "$app/forms";
  import googleLogo from "#lib/assets/google-logo.svg";
  import type { PageProps } from "./$types";

  let { data, form }: PageProps = $props();

  let sending = $state(false);

  // One form result at a time; split it by where it belongs on the screen.
  const sentTo = $derived(form && "sent" in form ? form.sent : null);
  const emailError = $derived(
    form && "email" in form && "message" in form ? form.message : null,
  );
  const googleError = $derived(
    form && "google" in form && "message" in form ? form.message : null,
  );
  const typedEmail = $derived(
    form && "email" in form ? form.email : (sentTo ?? ""),
  );
</script>

<div
  class="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-8"
>
  <h1 class="font-label text-3xl font-bold tracking-wider uppercase">
    Sign in
  </h1>
  <p class="text-ink-muted mt-2">
    Countsy keeps a running count of anything you want to track. Create a
    counter, tap plus or minus as the number changes, and set a goal if you want
    one.
  </p>

  {#if data.linkError}
    <p role="alert" class="mt-6 font-semibold">
      That sign-in link didn't work. It may have expired, or been opened in a
      different browser than the one that asked for it. Send yourself a new one.
    </p>
  {/if}

  <form
    method="POST"
    action="?/email"
    class="mt-6 space-y-4"
    use:enhance={() => {
      sending = true;
      return async ({ update }) => {
        await update({ reset: false });
        sending = false;
      };
    }}
  >
    <div class="flex flex-col gap-1">
      <label class="ui-label" for="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        autocomplete="email"
        required
        class="ui-input"
        value={typedEmail}
        aria-invalid={emailError ? "true" : undefined}
        aria-describedby={emailError ? "email-message" : undefined}
      />
    </div>
    <button
      type="submit"
      class="ui-btn ui-btn-primary w-full"
      disabled={sending}
    >
      {sending ? "Sending…" : "Email me a sign-in link"}
    </button>
    <div aria-live="polite">
      {#if sentTo}
        <p class="font-semibold">
          Check {sentTo} for your sign-in link. Open it in this browser.
        </p>
      {:else if emailError}
        <p id="email-message" class="font-semibold">{emailError}</p>
      {/if}
    </div>
  </form>

  <div class="text-ink-muted my-4 flex items-center gap-3 text-sm">
    <span class="bg-line h-px flex-1"></span>OR<span class="bg-line h-px flex-1"
    ></span>
  </div>

  <!-- Google's own button design, as its branding guidelines require. -->
  <form method="POST" action="?/google">
    <button class="gsi-button">
      <span class="gsi-state"></span>
      <span class="gsi-content">
        <img src={googleLogo} alt="" class="gsi-icon" />
        <span class="gsi-label">Sign in with Google</span>
      </span>
    </button>
  </form>
  <div aria-live="polite">
    {#if googleError}
      <p class="mt-4 font-semibold">{googleError}</p>
    {/if}
  </div>
</div>

<style>
  .gsi-button {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    min-width: min-content;
    height: 48px;
    padding: 0 12px;
    overflow: hidden;
    border: 1px solid #747775;
    border-radius: 4px;
    background-color: #ffffff;
    color: #1f1f1f;
    font-family: "Roboto", arial, sans-serif;
    font-size: 14px;
    letter-spacing: 0.25px;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    transition:
      background-color 0.218s,
      border-color 0.218s,
      box-shadow 0.218s;
  }
  .gsi-button:focus-visible {
    outline: 3px solid var(--accent);
    outline-offset: 2px;
  }
  .gsi-button:hover {
    box-shadow:
      0 1px 2px 0 rgb(60 64 67 / 0.3),
      0 1px 3px 1px rgb(60 64 67 / 0.15);
  }
  .gsi-state {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.218s;
  }
  .gsi-button:hover .gsi-state {
    background-color: #303030;
    opacity: 0.08;
  }
  .gsi-button:active .gsi-state,
  .gsi-button:focus .gsi-state {
    background-color: #303030;
    opacity: 0.12;
  }
  .gsi-content {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .gsi-icon {
    width: 20px;
    height: 20px;
    margin-right: 12px;
  }
  .gsi-label {
    flex-grow: 1;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Google's published dark theme for the button, following the app theme. */
  :global(:root[data-theme="dark"]) .gsi-button {
    border-color: #8e918f;
    background-color: #131314;
    color: #e3e3e3;
  }
  :global(:root[data-theme="dark"]) .gsi-button:hover .gsi-state,
  :global(:root[data-theme="dark"]) .gsi-button:active .gsi-state,
  :global(:root[data-theme="dark"]) .gsi-button:focus .gsi-state {
    background-color: #e3e3e3;
  }
  @media (prefers-color-scheme: dark) {
    :global(:root:not([data-theme="light"])) .gsi-button {
      border-color: #8e918f;
      background-color: #131314;
      color: #e3e3e3;
    }
    :global(:root:not([data-theme="light"])) .gsi-button:hover .gsi-state,
    :global(:root:not([data-theme="light"])) .gsi-button:active .gsi-state,
    :global(:root:not([data-theme="light"])) .gsi-button:focus .gsi-state {
      background-color: #e3e3e3;
    }
  }
</style>
