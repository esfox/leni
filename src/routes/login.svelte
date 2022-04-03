<script lang="ts">
  import { goto } from '$app/navigation';
  import Button from 'src/components/Button.svelte';
  import Input from 'src/components/Input.svelte';
  import Loader from 'src/components/Loader.svelte';
  import { AuthService } from 'src/services/AuthService';

  let email = '';
  let password = '';
  let loading = false;

  const login = async () => {
    loading = true;
    try {
      await AuthService.login(email, password);
      goto('/');
    } catch (error) {
      console.error(error);
    }
    loading = false;
  };
</script>

<div class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
  <h1 class="text-4xl font-bold">Leni</h1>
  <small class="mt-1">
    <strong>L</strong>ist of <strong>E</strong>xpenses '<strong>n</strong>
    <strong>I</strong>ncomes
  </small>
  <form class="w-72 mt-12 mx-auto" on:submit|preventDefault={login}>
    <Input bind:value={email} label="Email" type="email" />
    <Input bind:value={password} class="mt-5" type="password" label="Password" />
    <Button
      class="flex justify-center items-center mx-auto mt-8"
      width="10rem"
      rounded
      disabled={loading}
    >
      {#if loading}
        <Loader height="90%" thickness="6px" color="white" />
      {:else}
        Login
      {/if}
    </Button>
  </form>
</div>
