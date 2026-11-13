<script lang="ts">
  import { resolve } from "$app/paths";
</script>

<footer class="text-ink-muted mx-auto mt-12 max-w-5xl px-4 text-sm">
  <div
    class="border-line flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t py-6"
  >
    <p>© {new Date().getFullYear()} Narciso Lobo</p>
    <nav aria-label="Footer" class="flex gap-6">
      <a
        href="https://github.com/narcisolobo/countsy-ii"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-ink underline underline-offset-2">GitHub</a
      >
      <a
        href={resolve("/privacy")}
        class="hover:text-ink underline underline-offset-2">Privacy</a
      >
      <a
        href={resolve("/terms")}
        class="hover:text-ink underline underline-offset-2">Terms</a
      >
    </nav>
  </div>
</footer>
