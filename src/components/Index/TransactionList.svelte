<script lang="ts">
  import type { Transaction } from '$lib/interfaces';
  import { store } from '$lib/store';
  import ConfirmDeleteTransaction from './ConfirmDeleteTransaction.svelte';
  import TransactionListItem from './TransactionListItem.svelte';

  export let transactions = [];

  let loading = false;
  let showingConfirmDelete = false;
  let transactionToDelete: Transaction;

  const promptDelete = (transaction: Transaction) => {
    transactionToDelete = transaction;
    showingConfirmDelete = true;
  };

  const confirmDelete = async () => {
    loading = true;
    try {
      await store.deleteTransaction(transactionToDelete.id);
    } catch (error) {
      console.error(error);
    }
    showingConfirmDelete = false;
    loading = false;
  };
</script>

{#each transactions as transaction}
  <TransactionListItem
    amount={transaction.amount}
    title={transaction.title}
    date={transaction.date}
    onDelete={() => promptDelete(transaction)}
  />
{/each}

{#if transactionToDelete}
  <ConfirmDeleteTransaction
    bind:shown={showingConfirmDelete}
    transactionTitle={transactionToDelete.title}
    {loading}
    onConfirm={confirmDelete}
  />
{/if}
