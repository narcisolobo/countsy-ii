<script lang="ts">
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

  // A goal of 0 or less means "no goal" (the column allows only > 0 now, but
  // the card stays defensive).
  const goal = $derived(
    counter.goal !== null && counter.goal > 0 ? counter.goal : null,
  );
  const reached = $derived(goal !== null && counter.value >= goal);
  const titleId = $derived(`counter-${counter.id}-title`);
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
      <DrumRegister value={counter.value} label={counter.title} />
      <p
        class="font-label text-ink-muted mt-2 h-6 text-lg tracking-wider uppercase"
      >
        {#if goal !== null}
          {`of ${goal}${reached ? " · " : ""}`}{#if reached}<span
              class="font-semibold">reached</span
            >{/if}
        {/if}
      </p>
      <!-- Slice 2 wires these to the database. -->
      <div class="mt-auto grid grid-cols-2 gap-3 pt-2">
        <button
          type="button"
          class="ui-btn min-h-[50px]"
          aria-label="Decrement"
        >
          <Minus aria-hidden="true" />
        </button>
        <button
          type="button"
          class="ui-btn min-h-[50px]"
          aria-label="Increment"
        >
          <Plus aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
  {#if goal !== null}
    <div class="py-4 pr-4">
      <GoalGauge value={counter.value} {goal} />
    </div>
  {/if}
</article>
