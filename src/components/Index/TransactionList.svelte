<script lang="ts">
  import { store } from '$lib/store';
  import TransactionListItem from './TransactionListItem.svelte';

  $: transactions = $store.transactions;
</script>

<table class="w-full">
  <tbody>
    {#each transactions as transaction}
      <TransactionListItem
        amount={transaction.amount}
        title={transaction.title}
        date={transaction.date}
      />
    {/each}
  </tbody>
</table>
