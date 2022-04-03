<script lang="ts">
  import { goto } from '$app/navigation';
  import { AuthService } from 'src/services/AuthService';
  import { onMount } from 'svelte';

  let isAuthenticated = false;
  onMount(() => {
    if (!AuthService.isLoggedIn()) return goto('/login');
    isAuthenticated = true;
  });
</script>

{#if isAuthenticated}
  <slot />
{/if}
