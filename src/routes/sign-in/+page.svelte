<!-- Functional placeholder: auth plumbing only. The designed sign-in screen replaces this markup. -->
<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageProps } from "./$types";

  let { data, form }: PageProps = $props();
</script>

<svelte:head><title>Sign in · Countsy</title></svelte:head>

<main>
  <h1>Sign in</h1>

  {#if data.linkError}
    <p role="alert">
      That sign-in link didn't work. It may have expired, or been opened in a
      different browser. Request a new one.
    </p>
  {/if}

  {#if form && "sent" in form}
    <p role="status">Check {form.sent} for a sign-in link.</p>
  {:else}
    <form method="POST" action="?/email" use:enhance>
      <label for="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        autocomplete="email"
        required
        value={form?.email ?? ""}
      />
      <button>Email me a link</button>
    </form>
  {/if}

  <form method="POST" action="?/google">
    <button>Continue with Google</button>
  </form>

  {#if form?.message}
    <p role="alert">{form.message}</p>
  {/if}
</main>
