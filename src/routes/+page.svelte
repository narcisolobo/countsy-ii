<!--
  Step 1 placeholder: checks that the tokens, fonts and components
  from layout.css render in both themes. Replaced by the sign-in
  redirect in step 2.
-->
<main class="mx-auto max-w-xl space-y-6 px-4 py-12">
  <h1
    class="font-label text-accent text-4xl font-bold tracking-widest uppercase"
  >
    Countsy
  </h1>
  <p class="text-ink-muted">SvelteKit rewrite, step 1: design tokens.</p>

  <section class="bg-surface border-line space-y-4 rounded-sm border-2 p-6">
    <label class="block space-y-2">
      <span class="ui-label">Title</span>
      <input class="ui-input" placeholder="Glasses of water" />
    </label>
    <div class="flex gap-3">
      <button class="ui-btn ui-btn-primary">Save</button>
      <button class="ui-btn">Cancel</button>
    </div>
    <div
      class="bg-tile text-tile-ink font-label inline-block rounded-sm px-4 py-2 text-3xl font-bold"
    >
      0042
    </div>
    <p>
      <a class="ui-link" href="https://svelte.dev/docs/kit">SvelteKit docs</a>
    </p>
  </section>
</main>
