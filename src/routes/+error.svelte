<script lang="ts">
  import { page } from "$app/state";
  import { resolve } from "$app/paths";

  const notFound = $derived(page.status === 404);
</script>

<svelte:head
  ><title>{notFound ? "Not found" : "Something went wrong"} · Countsy</title
  ></svelte:head
>

<section class="mx-auto min-h-[50vh] max-w-5xl px-4 py-12">
  <h1 class="font-label mb-4 text-3xl font-bold tracking-wider uppercase">
    {notFound ? "Not found" : "Something went wrong"}
  </h1>
  <p class="text-ink-muted mb-6 max-w-prose">
    {#if notFound}
      {page.error?.message ?? "That page doesn't exist."} It may have been deleted,
      or the link is wrong.
    {:else}
      The page couldn't load. Try again in a moment.
    {/if}
  </p>
  <!-- `/` sends signed-in visitors on to their counters. -->
  <a href={resolve("/")} class="ui-btn">Back to Countsy</a>
</section>
