import { AuthService } from 'src/services/AuthService';
import { onMount } from 'svelte';
import { writable } from 'svelte/store';

export function auth()
{
  const isAuthenticated = writable(false);

  onMount(() =>
  {
    isAuthenticated.set(!!AuthService.getUser());
  });

  return {
    subscribe: isAuthenticated.subscribe,
  };
}
