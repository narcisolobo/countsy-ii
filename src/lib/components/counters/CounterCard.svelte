<script lang="ts">
  import { deserialize } from "$app/forms";
  import type { Counter } from "#lib/types/counter.js";
  import Minus from "@lucide/svelte/icons/minus";
  import Plus from "@lucide/svelte/icons/plus";
  import DrumRegister from "./DrumRegister.svelte";
  import GoalGauge from "./GoalGauge.svelte";

  type CardCounter = Pick<
    Counter,
    "id" | "title" | "description" | "value" | "goal" | "is_archived"
  >;

  let { counter }: { counter: CardCounter } = $props();

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
      const response = await fetch("?/step", {
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
      <!-- Slices 3–5 add rename, edit and archive controls to this row. -->
      <h2
        id={titleId}
        class="font-label text-accent flex min-h-9 items-center text-xl font-semibold tracking-wider break-words uppercase"
      >
        {counter.title}
      </h2>
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
      </p>
      <form
        method="POST"
        action="?/step"
        onsubmit={step}
        class="mt-auto grid grid-cols-2 gap-3 pt-2"
      >
        <input type="hidden" name="id" value={counter.id} />
        <button
          name="delta"
          value="-1"
          class="ui-btn min-h-[50px]"
          aria-label={`Decrease ${counter.title}`}
        >
          <Minus aria-hidden="true" />
        </button>
        <button
          name="delta"
          value="1"
          class="ui-btn min-h-[50px]"
          aria-label={`Increase ${counter.title}`}
        >
          <Plus aria-hidden="true" />
        </button>
      </form>
    </div>
  </div>
  {#if goal !== null}
    <div class="py-4 pr-4">
      <GoalGauge {value} {goal} />
    </div>
  {/if}
</article>
