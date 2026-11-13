<!-- Side menu on a native modal dialog: focus trap, Esc and focus return come free. -->
<script lang="ts">
  import { resolve } from "$app/paths";
  import CircleUserRound from "@lucide/svelte/icons/circle-user-round";
  import X from "@lucide/svelte/icons/x";

  let dialog: HTMLDialogElement | undefined;
  let open = $state(false);

  function register(node: HTMLDialogElement) {
    dialog = node;
    return () => {
      dialog = undefined;
    };
  }

  function show() {
    dialog?.showModal();
    open = true;
  }
  function hide() {
    dialog?.close();
  }
</script>

<button
  type="button"
  aria-label="Open menu"
  aria-haspopup="dialog"
  aria-expanded={open}
  aria-controls="menu"
  onclick={show}
  class="ui-btn-icon text-plate-ink hover:text-plate-ink focus-visible:outline-white"
>
  <CircleUserRound size={32} aria-hidden="true" />
</button>

<dialog
  {@attach register}
  id="menu"
  aria-label="Menu"
  onclose={() => (open = false)}
  onclick={(e) => {
    if (e.target === dialog) hide();
  }}
  class="bg-surface text-ink border-line fixed inset-y-0 right-0 m-0 ml-auto h-dvh max-h-none w-80 max-w-full border-l p-0 backdrop:bg-black/40"
>
  <nav class="flex flex-col gap-1 p-4">
    <button
      type="button"
      aria-label="Close menu"
      onclick={hide}
      class="ui-btn-icon ml-auto"
    >
      <X aria-hidden="true" />
    </button>
    <a
      href={resolve("/counters")}
      onclick={hide}
      class="hover:bg-page block rounded-sm px-3 py-3 text-lg">Counters</a
    >
    <form method="POST" action="/auth/sign-out">
      <button
        class="hover:bg-page block w-full cursor-pointer rounded-sm px-3 py-3 text-left text-lg"
        >Sign out</button
      >
    </form>
  </nav>
</dialog>
