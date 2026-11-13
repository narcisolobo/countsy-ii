<!--
  Counter title that renames in place. Click (or Enter/Space) to edit;
  Enter saves, Escape or leaving the field cancels. The new title shows at
  once and goes back if the save fails.
-->
<script lang="ts">
  import { enhance } from "$app/forms";

  let {
    id,
    title: savedTitle,
    labelId,
    startEditing = false,
  }: {
    id: string;
    title: string;
    /** id for the title text, so the card can use it as its label. */
    labelId: string;
    /** Open in edit mode, e.g. for a counter that was just created. */
    startEditing?: boolean;
  } = $props();

  /** Matches the counters_title_check constraint. */
  const TITLE_MAX = 24;

  let title = $derived(savedTitle); // optimistic; resets when the page reloads
  // Follows `startEditing` (which can turn true after this card mounts: after
  // "New counter" the list reloads first, then the result naming the new id
  // lands), and is set locally when the user opens or closes the field.
  let editing = $derived(startEditing);
  let invalid = $state(false);
  let failed = $state(false);

  function focusAndSelect(node: HTMLInputElement) {
    node.focus();
    node.select();
  }

  function stopEditing() {
    editing = false;
    invalid = false;
  }
</script>

<div class="min-w-0 flex-1">
  {#if editing}
    <form
      method="POST"
      action="?/rename"
      use:enhance={({ formData, cancel }) => {
        const next = String(formData.get("title") ?? "").trim();
        if (next === "") {
          invalid = true;
          cancel();
          return;
        }
        stopEditing();
        if (next === title) {
          cancel();
          return;
        }
        const previous = title;
        title = next;
        failed = false;
        return async ({ result }) => {
          if (result.type !== "success") {
            title = previous;
            failed = true;
          }
        };
      }}
    >
      <input type="hidden" name="id" value={id} />
      <input
        {@attach focusAndSelect}
        name="title"
        value={title}
        maxlength={TITLE_MAX}
        autocomplete="off"
        aria-label="Counter title"
        aria-invalid={invalid ? "true" : undefined}
        aria-describedby={invalid ? `${labelId}-message` : undefined}
        onkeydown={(e) => {
          if (e.key === "Escape") stopEditing();
        }}
        onblur={stopEditing}
        class="ui-input font-label min-h-10! py-1 text-xl font-semibold tracking-wider uppercase"
      />
    </form>
  {:else}
    <h2>
      <button
        type="button"
        onclick={() => {
          editing = true;
          failed = false;
        }}
        class="font-label text-accent flex min-h-9 w-full cursor-pointer items-center rounded-sm text-left text-xl font-semibold tracking-wider wrap-break-word uppercase focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span class="sr-only">Rename </span><span id={labelId}>{title}</span>
      </button>
    </h2>
  {/if}

  <div aria-live="polite">
    {#if invalid}
      <p id={`${labelId}-message`} class="mt-1 font-semibold">Enter a title.</p>
    {:else if failed}
      <p class="text-fail mt-1 font-semibold">
        Not saved. The title was put back.
      </p>
    {/if}
  </div>
</div>
