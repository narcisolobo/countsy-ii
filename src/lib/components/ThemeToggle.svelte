<!--
  Light/dark toggle on the header plate. Which icon shows is decided by CSS
  (html[data-theme] or the OS setting), so server-rendered HTML is right on
  first paint; script only flips the choice and remembers it.
-->
<script lang="ts">
  import Moon from "@lucide/svelte/icons/moon";
  import Sun from "@lucide/svelte/icons/sun";
  import { onMount } from "svelte";

  type Theme = "light" | "dark";

  let theme = $state<Theme | null>(null);

  function current(): Theme {
    const set = document.documentElement.dataset.theme;
    if (set === "light" || set === "dark") return set;
    return matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  onMount(() => {
    theme = current();
  });

  function toggle() {
    const next: Theme = current() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage unavailable: the theme still applies for this visit.
    }
    theme = next;
  }
</script>

<button
  type="button"
  onclick={toggle}
  aria-label="Dark theme"
  aria-pressed={theme === null ? undefined : theme === "dark"}
  class="ui-btn-icon text-plate-ink hover:text-plate-ink focus-visible:outline-white"
>
  <Moon size={28} class="theme-when-light" aria-hidden="true" />
  <Sun size={28} class="theme-when-dark" aria-hidden="true" />
</button>
