<script lang="ts">
  import "./layout.css";
  import { page } from "$app/state";
  import type { LayoutProps } from "./$types";

  let { children }: LayoutProps = $props();
</script>

<svelte:head>
  <title>Countsy: Simple counters</title>
  <!-- One canonical per page (the React app pointed every page at /). -->
  <link
    rel="canonical"
    href={`https://countsy.cisocodes.com${page.url.pathname}`}
  />
</svelte:head>

{@render children()}
