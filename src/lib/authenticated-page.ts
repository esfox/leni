import { AuthService } from 'src/services/AuthService';
import { onMount } from 'svelte';
import { writable } from 'svelte/store';

export function auth()
{
  const isAuthenticated = writable(false);

  onMount(async () =>
  {
    const authenticated = AuthService.getAccessToken() || await AuthService.refreshAccessToken();
    isAuthenticated.set(!!authenticated);
  });

  return {
    subscribe: isAuthenticated.subscribe,
  };
}
