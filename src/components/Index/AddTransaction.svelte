<script lang="ts">
  import type { Transaction } from '$lib/interfaces';
  import { store } from '$lib/store';
  import Button from 'src/components/Button.svelte';
  import Overlay from 'src/components/Overlay.svelte';
  import { TransactionType } from 'src/constants/common';
  import Input from '../Input.svelte';
  import Loader from '../Loader.svelte';

  type SaveHandler = (transaction: Transaction) => void;

  export let shown = false;
  export let onSave: SaveHandler = () => {};

  let type: TransactionType = TransactionType.Expense;
  let title: string | undefined;
  let amount: number | undefined;
  let notes: string | undefined;
  let loading: boolean;

  const setType = (newType: TransactionType) => (type = newType);

  const hide = () => (shown = false);

  const save = async () => {
    loading = true;

    try {
      let transactionAmount = Math.abs(amount);
      if (type === TransactionType.Expense) transactionAmount = -amount;

      const transaction = await store.addTransaction({
        title,
        amount: transactionAmount,
        notes
      });

      shown = false;
      type = TransactionType.Expense;
      title = undefined;
      amount = undefined;
      notes = undefined;
      onSave(transaction);
    } catch (error) {
      console.error(error);
    }
    loading = false;
  };

  $: {
    if (amount < 0) setType(TransactionType.Expense);
  }
</script>

<Overlay bind:shown>
  <div class="relative w-100 bg-white shadow-xl rounded-md">
    <div class="flex justify-between items-center px-5 pt-4">
      <h2 class="text-lg font-bold">Add New Transaction</h2>
      <!-- svelte-ignore a11y-positive-tabindex -->
      <button
        class="w-8 h-8 flex justify-center items-center text-3xl hover:bg-gray-100 rounded-full"
        on:click={hide}
        tabindex="1"
      >
        &times;
      </button>
    </div>
    <form class="p-5 z-10" on:submit|preventDefault={save}>
      <div class="grid grid-cols-2 pb-4">
        <Button
          type="button"
          class="rounded-l-lg border-r-0"
          variant="primary"
          outlined={type === TransactionType.Expense}
          on:click={() => setType(TransactionType.Income)}
        >
          Income
        </Button>
        <Button
          type="button"
          class="rounded-r-lg border-l-0"
          variant="danger"
          outlined={type === TransactionType.Income}
          on:click={() => setType(TransactionType.Expense)}
        >
          Expense
        </Button>
      </div>
      <Input bind:value={title} label="Title" type="text" placeholder="Bought a thing" />
      <Input
        bind:value={amount}
        class="mt-4"
        label="Amount"
        type="number"
        placeholder="100"
        step="any"
      />
      <Input
        bind:value={notes}
        class="mt-4"
        label="Notes"
        type="number"
        placeholder="The thing I bought is for another thing."
        textarea
        maxlength="500"
        rows="5"
      />
      <div class="text-center">
        <Button class="mt-5" width="8rem" rounded disabled={loading}>
          {#if loading}
            <Loader height="90%" thickness="6px" color="white" />
          {:else}
            Save
          {/if}
        </Button>
      </div>
    </form>
  </div>
</Overlay>
