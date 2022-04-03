<script lang="ts">
  import { store } from '$lib/store';
  import Authenticated from 'src/components/Authenticated.svelte';
  import Button from 'src/components/Button.svelte';
  import AddTransaction from 'src/components/Index/AddTransaction.svelte';
  import TransactionList from 'src/components/Index/TransactionList.svelte';
  import Loader from 'src/components/Loader.svelte';
  import Nav from 'src/components/Nav.svelte';
  import { formatCurrency } from 'src/helpers/common';
  import { onMount } from 'svelte';

  let loading = true;
  let showingAddTransaction = false;

  $: balanceString = formatCurrency($store.balance);

  const show = () => (showingAddTransaction = true);
  onMount(async () => {
    loading = true;
    try {
      await Promise.all([store.fetchBalance(), store.fetchTransactions()]);
    } catch (error) {
      console.error(error);
    }
    loading = false;
  });
</script>

<Authenticated>
  <Nav />
  <main class="max-w-[50rem] mx-auto">
    {#if loading}
      <Loader class="mt-12 mx-auto" />
    {:else}
      <div class="text-center px-6 py-8">
        <small>Balance</small>
        <h1 class="text-4xl font-bold">{balanceString}</h1>
      </div>

      <TransactionList />

      <div class="sticky bottom-8 left-0 w-full my-8">
        <Button class="flex items-center rounded-full mx-auto" on:click={show}>
          <span class="text-4xl mr-2.5">+</span>
          <span class="text-lg">Add Transaction</span>
        </Button>
      </div>

      <AddTransaction bind:shown={showingAddTransaction} />
    {/if}
  </main>
</Authenticated>
