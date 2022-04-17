<script lang="ts">
  import { goto } from '$app/navigation';
  import { LoginFormAction } from 'src/constants/common';
  import Button from 'src/components/Button.svelte';
  import Input from 'src/components/Input.svelte';
  import Loader from 'src/components/Loader.svelte';
  import Logo from 'src/components/Logo.svelte';
  import BlankCentered from 'src/layouts/BlankCentered.svelte';
  import { AuthService } from 'src/services/AuthService';

  export let action: LoginFormAction = LoginFormAction.Login;

  let email: string;
  let password: string;
  let loading = false;
  let errorMessage: string;

  const login = async ({ withGoogle }: { withGoogle?: boolean } = {}) => {
    loading = true;
    try {
      if (action === LoginFormAction.Register) await AuthService.register(email, password);
      else await AuthService.login({ email, password, withGoogle });
      goto('/');
    } catch (error) {
      errorMessage = error.message;
    }
    loading = false;
  };
</script>

<BlankCentered>
  <Logo />
  <form class="w-72 mt-12 mx-auto" on:submit|preventDefault={() => login()}>
    <Input bind:value={email} id="email" label="Email" type="email" />
    <Input bind:value={password} id="password" class="mt-5" type="password" label="Password" />
    {#if errorMessage}
      <div class="text-center text-red-500 mt-4">{errorMessage}</div>
    {/if}
    <div class="text-center">
      <Button class="mt-6" width="10rem" rounded disabled={loading}>
        {#if loading}
          <Loader height="90%" thickness="6px" color="white" />
        {:else}
          {action === LoginFormAction.Register ? 'Register' : 'Login'}
        {/if}
      </Button>
      <div
        class="
          w-full flex items-center text-center text-dark-50 my-6
          before:(content-DEFAULT flex-1 border-b mr-2)
          after:(content-DEFAULT flex-1 border-b ml-2)
        "
      >
        or
      </div>

      <Button
        type="button"
        variant="secondary"
        rounded
        on:click={() => login({ withGoogle: true })}
      >
        <i class="fa-brands fa-google mr-2" />
        Login with Google
      </Button>
    </div>
  </form>
  <slot />
</BlankCentered>
