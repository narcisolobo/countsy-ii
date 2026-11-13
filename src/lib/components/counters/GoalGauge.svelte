<!--
  A narrow measuring glass down the card's right edge. Water rises with the
  count; at the goal it reaches the brim line and the glass turns meter blue.
  Past the goal it tops up to the rim. Reaching the brim is the only
  celebration (DESIGN.md).
-->
<script lang="ts">
  let { value, goal }: { value: number; goal: number } = $props();

  /** The brim line marks the goal, at 94% of the glass height. */
  const BRIM = 94;
  const TICKS = [25, 50, 75];

  const reached = $derived(value >= goal);
  const fill = $derived(
    value > goal ? 100 : Math.min(Math.max(value / goal, 0), 1) * BRIM,
  );
  const mark = $derived(reached ? "bg-accent" : "bg-ink-muted");
</script>

<div
  role="meter"
  aria-valuemin={0}
  aria-valuemax={goal}
  aria-valuenow={Math.min(Math.max(value, 0), goal)}
  aria-label={`${value} of ${goal}${reached ? ", goal reached" : ""}`}
  class="relative h-full w-3.5"
>
  <!-- Open-topped glass. -->
  <div
    class={[
      "absolute inset-0 overflow-hidden rounded-b-[3px] border-2 border-t-0 transition-colors duration-200",
      reached ? "border-accent" : "border-ink-muted",
    ]}
  >
    <div
      class="bg-accent/85 absolute inset-x-0 bottom-0 transition-[height] duration-[180ms] ease-out"
      style:height={`${fill}%`}
    >
      {#if fill > 0 && fill < 100}
        <!-- Meniscus. -->
        <div class="bg-accent absolute inset-x-0 top-0 h-0.5"></div>
      {/if}
    </div>
  </div>
  <!-- Lip. -->
  <div
    class={[
      "absolute -top-px -right-1 left-0 h-0.5 transition-colors duration-200",
      mark,
    ]}
  ></div>
  <!-- Brim line (the goal) and quarter marks. -->
  <div
    class={["absolute right-0 h-0.5 w-1/2", mark]}
    style:bottom={`${BRIM}%`}
  ></div>
  {#each TICKS as t (t)}
    <div
      class={["absolute right-0 h-px w-2/5", mark]}
      style:bottom={`${(t * BRIM) / 100}%`}
    ></div>
  {/each}
</div>
