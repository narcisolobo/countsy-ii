<script lang="ts">
  import { enhance } from "$app/forms";
  import { resolve } from "$app/paths";
  import ConfirmDialog from "#lib/components/ConfirmDialog.svelte";
  import Archive from "@lucide/svelte/icons/archive";
  import ArrowLeft from "@lucide/svelte/icons/arrow-left";
  import Save from "@lucide/svelte/icons/save";
  import type { PageProps } from "./$types";

  let { data, form }: PageProps = $props();

  const counter = $derived(data.counter);
  // After a failed save, show what the user typed rather than the stored row.
  const values = $derived(
    form?.values ?? {
      title: counter.title,
      description: counter.description ?? "",
      value: String(counter.value),
      goal: counter.goal === null ? "" : String(counter.goal),
    },
  );
  const errors: Partial<
    Record<"title" | "description" | "value" | "goal", string>
  > = $derived((form && "errors" in form ? form.errors : undefined) ?? {});
  const saveFailed = $derived(!!form && "saveFailed" in form);

  let saving = $state(false);
  let archiveOpen = $state(false);
  let archiveFailed = $state(false);
</script>

<svelte:head><title>Edit {counter.title} · Countsy</title></svelte:head>

{#snippet field(
  name: "title" | "description" | "value" | "goal",
  label: string,
  input: import("svelte").Snippet<[Record<string, unknown>]>,
)}
  {@const message = errors[name]}
  <div class="flex flex-col gap-1">
    <label class="ui-label" for={name}>{label}</label>
    {@render input({
      id: name,
      name,
      "aria-invalid": message ? "true" : undefined,
      "aria-describedby": message ? `${name}-message` : undefined,
    })}
    {#if message}
      <p id={`${name}-message`} class="font-semibold">{message}</p>
    {/if}
  </div>
{/snippet}

{#snippet titleInput(attrs: Record<string, unknown>)}
  <input
    {...attrs}
    class="ui-input"
    value={values.title}
    required
    maxlength={24}
    autocomplete="off"
  />
{/snippet}

{#snippet descriptionInput(attrs: Record<string, unknown>)}
  <textarea
    {...attrs}
    class="ui-input min-h-24 resize-y leading-snug"
    value={values.description}
    maxlength={100}
    rows={3}></textarea>
{/snippet}

{#snippet valueInput(attrs: Record<string, unknown>)}
  <input
    {...attrs}
    class="ui-input tabular-nums"
    type="number"
    step="1"
    inputmode="numeric"
    value={values.value}
    required
  />
{/snippet}

{#snippet goalInput(attrs: Record<string, unknown>)}
  <input
    {...attrs}
    class="ui-input tabular-nums"
    type="number"
    step="1"
    min="1"
    inputmode="numeric"
    value={values.goal}
  />
{/snippet}

<section class="mx-auto min-h-[70vh] max-w-5xl px-4 py-6">
  <h1 class="font-label mb-6 text-3xl font-bold tracking-wider uppercase">
    Edit counter
  </h1>

  <form
    method="POST"
    use:enhance={() => {
      saving = true;
      return async ({ update }) => {
        await update({ reset: false });
        saving = false;
      };
    }}
    class="bg-surface border-line flex max-w-xl flex-col gap-4 rounded-sm border p-4 sm:p-6"
  >
    {@render field("title", "Title", titleInput)}
    {@render field("description", "Description (optional)", descriptionInput)}
    {@render field("value", "Value", valueInput)}
    {@render field("goal", "Goal (optional)", goalInput)}

    <div aria-live="polite">
      {#if saveFailed}
        <p class="text-fail font-semibold">
          Not saved. Your changes are still here; try again.
        </p>
      {:else if archiveFailed}
        <p class="text-fail font-semibold">
          Couldn't archive this counter. Try again.
        </p>
      {/if}
    </div>

    <div class="mt-2 flex flex-wrap gap-3">
      <a href={resolve("/counters")} class="ui-btn">
        <ArrowLeft aria-hidden="true" /> Back
      </a>
      {#if !counter.is_archived}
        <button
          type="button"
          class="ui-btn"
          onclick={() => {
            archiveFailed = false;
            archiveOpen = true;
          }}
        >
          <Archive aria-hidden="true" /> Archive
        </button>
      {/if}
      <button class="ui-btn ui-btn-primary" disabled={saving}>
        <Save aria-hidden="true" />
        {saving ? "Saving…" : "Save"}
      </button>
    </div>
  </form>
</section>

<ConfirmDialog
  bind:open={archiveOpen}
  heading="Archive this counter?"
  confirmLabel="Archive"
  action="/counters?/archive"
  fields={{ id: counter.id }}
  onfailure={() => (archiveFailed = true)}
>
  <p>
    <span class="font-semibold">{counter.title}</span> will move out of your list.
    Use Show archived to find it, restore it, or delete it.
  </p>
</ConfirmDialog>
