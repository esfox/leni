<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  export const load: Load = ({ url }) => {
    const page = url.searchParams.get('page');
    return {
      props: {
        transactionsListPage: page ? Number(page) : 1
      }
    };
  };
</script>

<script lang="ts">
  import { auth } from '$lib/authenticated-page';
  import { store } from '$lib/store';
  import Button from 'src/components/Button.svelte';
  import AddTransaction from 'src/components/Index/AddTransaction.svelte';
  import TransactionList from 'src/components/Index/TransactionList.svelte';
  import Loader from 'src/components/Loader.svelte';
  import Nav from 'src/components/Nav.svelte';
  import Pagination from 'src/components/Pagination.svelte';
  import { TRANSACTION_LIST_LIMIT } from 'src/constants/common';
  import { formatCurrency, setPageSearchParam } from 'src/helpers/common';

  export let transactionsListPage = 1;

  let isLoggedIn = auth();
  isLoggedIn.subscribe((isLoggedIn) => {
    if (!isLoggedIn) return;
    loadData();
  });

  let loading = true;
  let showingAddTransaction = false;

  $: balanceString = formatCurrency($store.balance);
  $: transactions = $store.transactions;
  $: transactionsCount = $store.transactionsCount;

  $: transactionsListPage && loadData();

  const show = () => (showingAddTransaction = true);

  const loadData = async (transactionsOnly?: boolean) => {
    loading = true;
    try {
      if (transactionsOnly) {
        await store.fetchTransactions(transactionsListPage);
      } else {
        await Promise.all([store.fetchBalance(), store.fetchTransactions(transactionsListPage)]);
      }
    } catch (error) {
      console.error(error);
    }
    loading = false;
  };

  const changeTransactionsListPage = (page: number) => {
    transactionsListPage = page;
    loadData(true);
    setPageSearchParam(transactionsListPage);
  };
</script>

{#if $isLoggedIn}
  <Nav />
  <main class="max-w-[50rem] mx-auto">
    <div class="text-center px-6 py-8">
      <small>Balance</small>
      <h1 class="text-4xl font-bold">{balanceString}</h1>
    </div>

    {#if loading}
      <Loader class="mt-12 mx-auto" />
    {:else}
      <TransactionList {transactions} />
    {/if}

    {#if transactions.length > 0}
      <Pagination
        class="flex justify-center py-8"
        currentPage={transactionsListPage}
        totalItems={transactionsCount}
        itemsPerPage={TRANSACTION_LIST_LIMIT}
        onChangePage={changeTransactionsListPage}
      />
    {/if}

    <div class="sticky bottom-8 left-0 w-full pt-16">
      <Button class="flex items-center rounded-full mx-auto" on:click={show}>
        <i class="fa-solid fa-plus fa-xl mr-2.5" />
        <span class="text-lg">Add Transaction</span>
      </Button>
    </div>
    <AddTransaction bind:shown={showingAddTransaction} onSave={() => loadData()} />
  </main>
{/if}
