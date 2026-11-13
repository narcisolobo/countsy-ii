<!-- Meter-blue header plate. The theme toggle and menu arrive with the counters screen. -->
<script lang="ts">
  import { resolve } from "$app/paths";
</script>

<header class="bg-plate text-plate-ink">
  <nav class="mx-auto flex max-w-5xl items-center gap-2 px-4 py-2">
    <a
      href={resolve("/")}
      class="font-label flex-1 py-1 text-3xl font-bold tracking-widest uppercase focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      Countsy
    </a>
  </nav>
</header>
