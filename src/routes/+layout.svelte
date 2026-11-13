<script lang="ts">
  import "./layout.css";
  import Footer from "#lib/components/Footer.svelte";
  import Header from "#lib/components/Header.svelte";
  import { page } from "$app/state";
  import type { LayoutProps } from "./$types";

  let { children, data }: LayoutProps = $props();
</script>

<svelte:head>
  <title>Countsy: Simple counters</title>
  <!-- One canonical per page (the React app pointed every page at /). -->
  <link
    rel="canonical"
    href={`https://countsy.cisocodes.com${page.url.pathname}`}
  />
</svelte:head>

<!-- Full-height shell: the footer sits at the bottom of short pages. -->
<div class="flex min-h-dvh flex-col">
  <Header signedIn={data.signedIn} />
  <!-- A flex column so a page can centre itself vertically (sign-in).
       Page roots carry w-full so their mx-auto containers still fill it. -->
  <main class="flex flex-1 flex-col">
    {@render children()}
  </main>
  <Footer />
</div>
