<script lang="ts">
  import type { Transaction } from '$lib/interfaces';

  import { store } from '$lib/store';
  import ConfirmDeleteTransaction from './ConfirmDeleteTransaction.svelte';
  import TransactionListItem from './TransactionListItem.svelte';

  let loading = false;
  let showingConfirmDelete = false;
  let transactionToDelete: Transaction;

  $: transactions = $store.transactions;

  const promptDelete = (transaction: Transaction) => {
    transactionToDelete = transaction;
    showingConfirmDelete = true;
  };

  const confirmDelete = async () => {
    loading = true;
    try {
      await store.deleteTransaction(transactionToDelete.id);
      // TODO: Show prompt
    } catch (error) {
      console.error(error);
    }
    showingConfirmDelete = false;
    loading = false;
  };
</script>

<table class="w-full">
  <thead>
    <tr>
      <th class="text-left font-normal"><small>Amount</small></th>
      <th class="text-left font-normal"><small>Title</small></th>
      <th class="text-left font-normal"><small>Date</small></th>
      <th />
    </tr>
  </thead>
  <tbody>
    {#each transactions as transaction}
      <TransactionListItem
        amount={transaction.amount}
        title={transaction.title}
        date={transaction.date}
        onDelete={() => promptDelete(transaction)}
      />
    {/each}
  </tbody>

  {#if transactionToDelete}
    <ConfirmDeleteTransaction
      bind:shown={showingConfirmDelete}
      transactionTitle={transactionToDelete.title}
      {loading}
      onConfirm={confirmDelete}
    />
  {/if}
</table>
