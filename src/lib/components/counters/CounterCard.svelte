<script lang="ts">
  import { deserialize, enhance } from "$app/forms";
  import ConfirmDialog from "#lib/components/ConfirmDialog.svelte";
  import type { Counter } from "#lib/types/counter.js";
  import Archive from "@lucide/svelte/icons/archive";
  import Minus from "@lucide/svelte/icons/minus";
  import Plus from "@lucide/svelte/icons/plus";
  import DrumRegister from "./DrumRegister.svelte";
  import CounterTitle from "./CounterTitle.svelte";
  import GoalGauge from "./GoalGauge.svelte";

  type CardCounter = Pick<
    Counter,
    "id" | "title" | "description" | "value" | "goal" | "is_archived"
  >;

  let {
    counter,
    justCreated = false,
    showArchived = false,
  }: {
    counter: CardCounter;
    justCreated?: boolean;
    /** The list includes archived counters (keeps `?show=archived`). */
    showArchived?: boolean;
  } = $props();

  /** Action URL that keeps "Show archived" after a plain (no-JS) post. */
  function act(name: string) {
    return showArchived ? `?show=archived&/${name}` : `?/${name}`;
  }

  let archiveOpen = $state(false);
  let deleteOpen = $state(false);
  let changeFailed = $state<"archive" | "restore" | "delete" | null>(null);
  const changeFailedText = {
    archive: "Couldn't archive this counter. Try again.",
    restore: "Couldn't restore this counter. Try again.",
    delete: "Couldn't delete this counter. Try again.",
  };

  /*
   * Optimistic counting. The number shown is
   *   confirmed (what the database last said)
   *   + inFlight (the change being saved right now)
   *   + queued (taps made while that save is running).
   * One request at a time per card; taps made meanwhile are combined into the
   * next one. A success replaces `confirmed` with the stored value, so the
   * card also catches up with counts made on another device. A failure drops
   * only that request's change, which visibly puts the count back.
   */
  let confirmed = $derived(counter.value); // reset whenever the page reloads
  let inFlight = $state(0);
  let queued = $state(0);
  let failed = $state(false);
  let saving = false;

  const value = $derived(confirmed + inFlight + queued);

  // A goal of 0 or less means "no goal" (the column allows only > 0 now, but
  // the card stays defensive).
  const goal = $derived(
    counter.goal !== null && counter.goal > 0 ? counter.goal : null,
  );
  const reached = $derived(goal !== null && value >= goal);
  const titleId = $derived(`counter-${counter.id}-title`);

  /** Saves `delta`; resolves to the stored value, or null if it wasn't saved. */
  async function save(delta: number): Promise<number | null> {
    const body = new FormData();
    body.set("id", counter.id);
    body.set("delta", String(delta));
    try {
      const response = await fetch(act("step"), {
        method: "POST",
        body,
        headers: { accept: "application/json" },
      });
      const result = deserialize(await response.text());
      return result.type === "success" && typeof result.data?.value === "number"
        ? result.data.value
        : null;
    } catch {
      return null; // offline, or the session ended and we got a redirect page
    }
  }

  async function flush() {
    if (saving) return;
    saving = true;
    while (queued !== 0) {
      inFlight = queued;
      queued = 0;
      const stored = await save(inFlight);
      if (stored === null) {
        failed = true;
      } else {
        confirmed = stored;
      }
      inFlight = 0;
    }
    saving = false;
  }

  function step(event: SubmitEvent) {
    // Without JavaScript the form posts normally and the page reloads.
    event.preventDefault();
    const submitter = event.submitter as HTMLButtonElement | null;
    const delta = Number(submitter?.value);
    if (!Number.isInteger(delta) || delta === 0) return;
    failed = false;
    queued += delta;
    flush();
  }
</script>

<article
  aria-labelledby={titleId}
  class="bg-surface border-line flex rounded-sm border"
>
  <div class="flex min-w-0 flex-1 flex-col">
    <div class="pt-3 pr-1 pl-4">
      <!-- Slice 5 adds the edit button to this row. -->
      <div class="flex items-start gap-1">
        <CounterTitle
          id={counter.id}
          title={counter.title}
          labelId={titleId}
          startEditing={justCreated}
        />
        {#if !counter.is_archived}
          <button
            type="button"
            onclick={() => {
              changeFailed = null;
              archiveOpen = true;
            }}
            aria-label={`Archive ${counter.title}`}
            title="Archive"
            class="ui-btn-icon -mt-1.5 shrink-0"
          >
            <Archive size={22} aria-hidden="true" />
          </button>
        {/if}
      </div>
      {#if counter.description}
        <p class="text-ink-muted mt-0.5 line-clamp-2 pr-3 leading-snug">
          {counter.description}
        </p>
      {/if}
    </div>

    <!-- Controls sit at the card's foot so a row of cards lines them up. -->
    <div class="flex flex-1 flex-col px-4 pt-3 pb-4">
      <DrumRegister {value} label={counter.title} />
      <div aria-live="assertive">
        {#if failed}
          <p class="text-fail mt-2 font-semibold">
            Not saved. The count was put back.
          </p>
        {:else if changeFailed}
          <p class="text-fail mt-2 font-semibold">
            {changeFailedText[changeFailed]}
          </p>
        {/if}
      </div>
      <p
        class="font-label text-ink-muted mt-2 h-6 text-lg tracking-wider uppercase"
      >
        {#if goal !== null}
          {`of ${goal}${reached ? " · " : ""}`}{#if reached}<span
              class="font-semibold">reached</span
            >{/if}
        {/if}
        {#if counter.is_archived}
          <span class={["font-semibold", goal !== null && "ml-3"]}
            >Archived</span
          >
        {/if}
      </p>
      {#if counter.is_archived}
        <!-- Put away: read-only. Restore to count again, or delete for good. -->
        <div class="mt-auto grid grid-cols-2 gap-3 pt-2">
          <form
            method="POST"
            action={act("restore")}
            class="flex"
            use:enhance={() => {
              changeFailed = null;
              return async ({ result, update }) => {
                if (result.type === "failure" || result.type === "error") {
                  changeFailed = "restore";
                } else {
                  await update();
                }
              };
            }}
          >
            <input type="hidden" name="id" value={counter.id} />
            <button class="ui-btn min-h-12.5 flex-1">Restore</button>
          </form>
          <button
            type="button"
            class="ui-btn min-h-12.5"
            onclick={() => {
              changeFailed = null;
              deleteOpen = true;
            }}>Delete</button
          >
        </div>
      {:else}
        <form
          method="POST"
          action={act("step")}
          onsubmit={step}
          class="mt-auto grid grid-cols-2 gap-3 pt-2"
        >
          <input type="hidden" name="id" value={counter.id} />
          <button
            name="delta"
            value="-1"
            class="ui-btn min-h-12.5"
            aria-label={`Decrease ${counter.title}`}
          >
            <Minus aria-hidden="true" />
          </button>
          <button
            name="delta"
            value="1"
            class="ui-btn min-h-12.5"
            aria-label={`Increase ${counter.title}`}
          >
            <Plus aria-hidden="true" />
          </button>
        </form>
      {/if}
    </div>
  </div>
  {#if goal !== null}
    <div class="py-4 pr-4">
      <GoalGauge {value} {goal} />
    </div>
  {/if}
</article>

<ConfirmDialog
  bind:open={archiveOpen}
  heading="Archive this counter?"
  confirmLabel="Archive"
  action={act("archive")}
  fields={{ id: counter.id }}
  onfailure={() => (changeFailed = "archive")}
>
  <p>
    <span class="font-semibold">{counter.title}</span> will move out of your list.
    Use Show archived to find it, restore it, or delete it.
  </p>
</ConfirmDialog>

<ConfirmDialog
  bind:open={deleteOpen}
  heading="Delete this counter?"
  confirmLabel="Delete"
  action={act("delete")}
  fields={{ id: counter.id }}
  onfailure={() => (changeFailed = "delete")}
>
  <p>
    <span class="font-semibold">{counter.title}</span> and its count of {value} will
    be deleted. This can't be undone.
  </p>
</ConfirmDialog>
