<!--
  "Are you sure?" on a native modal dialog: focus trap, Esc and focus return
  come free. Focus starts on Cancel, so a stray Enter never confirms. The
  confirm button posts `action` with `fields` and reloads the page data.
-->
<script lang="ts">
  import { enhance } from "$app/forms";
  import type { Snippet } from "svelte";

  let {
    open = $bindable(false),
    heading,
    confirmLabel,
    action,
    fields,
    onfailure,
    children,
  }: {
    open?: boolean;
    heading: string;
    confirmLabel: string;
    /** Form action URL, e.g. "?/archive". */
    action: string;
    /** Hidden inputs sent with the action. */
    fields: Record<string, string>;
    /** Called when the action fails, after the dialog closes. */
    onfailure?: () => void;
    children: Snippet;
  } = $props();

  let pending = $state(false);

  // Keeps the native dialog in step with `open`; Svelte reruns an attachment
  // whenever the state it reads changes.
  function sync(dialog: HTMLDialogElement) {
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }
</script>

<dialog
  {@attach sync}
  aria-labelledby="confirm-heading"
  onclose={() => (open = false)}
  class="bg-surface text-ink border-line m-auto w-[calc(100%-2rem)] max-w-md rounded-sm border-2 p-0 backdrop:bg-black/50"
>
  {#if open}
    <div class="p-6">
      <h2 id="confirm-heading" class="ui-label text-xl">{heading}</h2>
      <div class="py-4">{@render children()}</div>
      <form
        method="POST"
        {action}
        use:enhance={() => {
          pending = true;
          return async ({ result, update }) => {
            pending = false;
            open = false;
            if (result.type === "success" || result.type === "redirect") {
              await update();
            } else {
              onfailure?.();
            }
          };
        }}
        class="mt-2 flex justify-end gap-2"
      >
        {#each Object.entries(fields) as [name, value] (name)}
          <input type="hidden" {name} {value} />
        {/each}
        <!-- svelte-ignore a11y_autofocus -->
        <button
          type="button"
          class="ui-btn"
          autofocus
          onclick={() => (open = false)}>Cancel</button
        >
        <button class="ui-btn ui-btn-primary" disabled={pending}
          >{confirmLabel}</button
        >
      </form>
    </div>
  {/if}
</dialog>
