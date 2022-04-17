import { AuthService } from 'src/services/AuthService';
import { onMount } from 'svelte';
import { writable } from 'svelte/store';

export function auth()
{
  const isAuthenticated = writable(false);

  onMount(async () =>
  {
    const authenticated = AuthService.getAccessToken() || await AuthService.refreshAccessToken();
    if(!authenticated)
      return AuthService.checkLogin(isLoggedIn => isAuthenticated.set(isLoggedIn));

    isAuthenticated.set(!!authenticated);
  });

  return {
    subscribe: isAuthenticated.subscribe,
  };
}
