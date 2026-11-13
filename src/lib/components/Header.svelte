<!-- Meter-blue header plate: wordmark, theme toggle, menu. -->
<script lang="ts">
  import { resolve } from "$app/paths";
  import Menu from "./Menu.svelte";
  import ThemeToggle from "./ThemeToggle.svelte";

  let { signedIn }: { signedIn: boolean } = $props();
</script>

<header class="bg-plate text-plate-ink">
  <nav class="mx-auto flex max-w-5xl items-center gap-2 px-4 py-2">
    <a
      href={resolve("/")}
      class="font-label flex-1 py-1 text-3xl font-bold tracking-widest uppercase focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      Countsy
    </a>
    <ThemeToggle />
    <!-- Signed out, the menu would only offer the page you're on. -->
    {#if signedIn}
      <Menu />
    {/if}
  </nav>
</header>
