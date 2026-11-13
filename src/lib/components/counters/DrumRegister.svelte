<!--
  Water-meter register: one tile per digit, all digits alike. Only tiles whose
  digit changed roll in; Svelte skips `in:` transitions on first render, so a
  page load never animates.
-->
<script lang="ts">
  import { cubicOut } from "svelte/easing";
  import { prefersReducedMotion } from "svelte/motion";
  import type { TransitionConfig } from "svelte/transition";

  let { value, label }: { value: number; label: string } = $props();

  const MIN_DIGITS = 4;

  const digits = $derived(
    String(Math.abs(value)).padStart(MIN_DIGITS, "0").split(""),
  );
  const negative = $derived(value < 0);
  const chars = $derived(digits.length + (negative ? 1 : 0));
  // DESIGN.md: 74px up to 4 characters, then 60 / 48 / 38.
  const size = $derived(
    chars <= 4 ? "74px" : chars === 5 ? "60px" : chars === 6 ? "48px" : "38px",
  );

  // The digit drops in from 40% above with a fade (DESIGN.md: 180ms ease-out).
  const roll: (node: Element) => TransitionConfig = () => ({
    duration: prefersReducedMotion.current ? 0 : 180,
    easing: cubicOut,
    css: (t) => `transform: translateY(${(1 - t) * -40}%); opacity: ${t}`,
  });
</script>

<div>
  <div
    aria-hidden="true"
    class="flex gap-0.75 leading-none font-semibold tabular-nums"
    style:font-size={size}
  >
    {#if negative}
      <span class="tile"><span>−</span></span>
    {/if}
    {#each digits as digit, i (`${i}-${digit}`)}
      <span class="tile"><span in:roll>{digit}</span></span>
    {/each}
  </div>
  <span role="status" class="sr-only">{label}: {value}</span>
</div>

<style>
  .tile {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0.7em;
    height: 1.3em;
    overflow: hidden;
    border-radius: 0.06em;
    background-color: var(--tile);
    color: var(--tile-ink);
  }
  /* The drum seam: a 1px mid-line at 15% tile ink. */
  .tile::after {
    content: "";
    position: absolute;
    inset-inline: 0;
    top: 50%;
    height: 1px;
    background-color: color-mix(in srgb, var(--tile-ink) 15%, transparent);
  }
</style>
