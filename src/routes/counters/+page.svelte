<script lang="ts">
  import CounterCard from "#lib/components/counters/CounterCard.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<svelte:head><title>Counters · Countsy</title></svelte:head>

<section class="mx-auto max-w-5xl px-4 py-6">
  <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
    <h1 class="font-label text-3xl font-bold tracking-wider uppercase">
      Counters
    </h1>
    <!-- Slices 3–4 add "New counter" and "Show archived" here. -->
  </div>

  {#if data.counters === null}
    <p role="alert" class="text-fail font-semibold">
      Your counters didn't load. Reload the page to try again.
    </p>
  {:else if data.counters.length === 0}
    <p class="text-ink-muted">
      No counters yet. Use New counter to start counting.
    </p>
  {:else}
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {#each data.counters as counter (counter.id)}
        <CounterCard {counter} />
      {/each}
    </div>
  {/if}
</section>
