<script lang="ts">
  import Button from 'src/components/Button.svelte';
  import Overlay from 'src/components/Overlay.svelte';
  import type { Transaction } from 'src/interfaces';
  import { store } from 'src/store';
  import Input from '../Input.svelte';
  import Loader from '../Loader.svelte';

  type SaveHandler = (transaction: Transaction) => void;

  export let shown = false;
  export let onSave: SaveHandler = () => {};

  let title: string;
  let amount: number;
  let notes: string;

  let loading: boolean;

  const hide = () => (shown = false);

  const save = async () => {
    loading = true;
    try {
      const transaction = await store.addTransaction({
        title,
        amount,
        notes
      });

      shown = false;
      onSave(transaction);
    } catch (error) {
      console.error(error);
    }
    loading = false;
  };
</script>

<Overlay bind:shown>
  <div class="relative w-100 bg-white shadow-xl rounded-md">
    <div class="flex justify-between items-center p-4">
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
    <form class="px-4 pt-2 pb-4 z-10" on:submit|preventDefault={save}>
      <Input bind:value={title} label="Title" type="text" placeholder="Bought a thing" />
      <Input bind:value={amount} class="mt-4" label="Amount" type="number" placeholder="100" />
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
