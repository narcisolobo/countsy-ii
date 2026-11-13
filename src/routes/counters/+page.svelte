<script lang="ts">
  import { enhance, type SubmitFunction } from "$app/forms";
  import { resolve } from "$app/paths";
  import CounterCard from "#lib/components/counters/CounterCard.svelte";
  import Plus from "@lucide/svelte/icons/plus";
  import type { PageProps } from "./$types";

  let { data, form }: PageProps = $props();

  let creating = $state(false);

  // The new counter's card opens in rename mode (see CounterCard).
  const createdId = $derived(form && "created" in form ? form.created : null);
  const createFailed = $derived(!!form && "createFailed" in form);

  // After archive, restore or delete, the card that had focus is gone or
  // rebuilt, so a short status line takes focus and says what happened.
  const changed = $derived(
    form && "changed" in form && form.changed && "title" in form
      ? { what: form.changed, title: form.title }
      : null,
  );
  const changedText = {
    archive: "archived. Find it under Show archived.",
    restore: "restored.",
    delete: "deleted.",
  };
  function focusOnMount(node: HTMLElement) {
    node.focus();
  }

  const createAction = $derived(
    data.showArchived ? "?show=archived&/create" : "?/create",
  );

  const create: SubmitFunction = () => {
    creating = true;
    return async ({ update }) => {
      await update();
      creating = false;
    };
  };
</script>

<svelte:head><title>Counters · Countsy</title></svelte:head>

<section class="mx-auto max-w-5xl px-4 py-6">
  <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
    <h1 class="font-label text-3xl font-bold tracking-wider uppercase">
      Counters
    </h1>
    {#if data.counters !== null}
      <div class="flex flex-wrap gap-3">
        <!-- A link, not a script toggle: works without JavaScript and survives a reload. -->
        <a
          class="ui-btn"
          href={data.showArchived
            ? resolve("/counters")
            : resolve("/counters?show=archived")}
          >{data.showArchived ? "Hide archived" : "Show archived"}</a
        >
        <form method="POST" action={createAction} use:enhance={create}>
          <button class="ui-btn ui-btn-primary" disabled={creating}>
            {creating ? "Adding…" : "New counter"}
          </button>
        </form>
      </div>
    {/if}
  </div>

  <div aria-live="polite">
    {#if createFailed}
      <p class="text-fail mb-4 font-semibold">
        Couldn't add a counter. Try again.
      </p>
    {:else if changed}
      {#key form}
        <p
          tabindex="-1"
          {@attach focusOnMount}
          class="mb-4 font-semibold focus:outline-none"
        >
          {changed.title}
          {changedText[changed.what]}
        </p>
      {/key}
    {/if}
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
        <CounterCard
          {counter}
          justCreated={counter.id === createdId}
          showArchived={data.showArchived}
        />
      {/each}
      <form
        method="POST"
        action={createAction}
        use:enhance={create}
        class="flex"
      >
        <button
          disabled={creating}
          class="border-ink-muted text-ink-muted hover:border-ink hover:text-ink font-label focus-visible:outline-accent flex min-h-56 flex-1 cursor-pointer items-center justify-center gap-2 rounded-sm border-2 border-dashed text-xl font-semibold tracking-wider uppercase transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus aria-hidden="true" /> New counter
        </button>
      </form>
    </div>
  {/if}
</section>
