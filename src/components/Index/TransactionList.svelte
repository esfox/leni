<script lang="ts">
  import type { Transaction } from '$lib/interfaces';
  import { store } from '$lib/store';
  import ConfirmDeleteTransaction from './ConfirmDeleteTransaction.svelte';
  import TransactionForm from './TransactionForm.svelte';
  import TransactionListItem from './TransactionListItem.svelte';

  export let transactions: Transaction[] = [];

  let loading = false;
  let selectedTransaction: Transaction;
  let showingEditTransaction = false;
  let showingConfirmDelete = false;

  const edit = (transaction: Transaction) => {
    selectedTransaction = { ...transaction };
    showingEditTransaction = true;
  };

  const promptDelete = (transaction: Transaction) => {
    selectedTransaction = transaction;
    showingConfirmDelete = true;
  };

  const confirmDelete = async () => {
    loading = true;
    try {
      await store.deleteTransaction(selectedTransaction.id);
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
    notes={transaction.notes}
    onEdit={() => edit(transaction)}
    onDelete={() => promptDelete(transaction)}
  />
{/each}

{#if selectedTransaction}
  <ConfirmDeleteTransaction
    bind:shown={showingConfirmDelete}
    transactionTitle={selectedTransaction.title}
    {loading}
    onConfirm={confirmDelete}
  />
  <!-- {#if showingEditTransaction} -->
  <TransactionForm transaction={selectedTransaction} bind:shown={showingEditTransaction} />
  <!-- {/if} -->
{/if}
