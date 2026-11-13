<!-- Functional placeholder: proves the server client and RLS end to end. The designed counters screen replaces this markup. -->
<script lang="ts">
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<svelte:head><title>Counters · Countsy</title></svelte:head>

<main>
  <h1>Counters</h1>
  <ul>
    {#each data.counters as counter (counter.id)}
      <li>
        {counter.title}: {counter.value}{counter.goal
          ? ` of ${counter.goal}`
          : ""}
        {#if counter.is_archived}(archived){/if}
      </li>
    {:else}
      <li>No counters yet.</li>
    {/each}
  </ul>
  <form method="POST" action="/auth/sign-out">
    <button>Sign out</button>
  </form>
</main>
