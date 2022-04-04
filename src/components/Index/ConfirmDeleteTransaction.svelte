<script lang="ts">
  import Overlay from 'src/components/Overlay.svelte';
  import Button from '../Button.svelte';
  import Loader from '../Loader.svelte';

  export let shown = false;
  export let loading = false;
  export let transactionTitle: string = undefined;
  export let onConfirm = () => {};

  const hide = () => (shown = false);
</script>

<Overlay bind:shown persistent>
  <div class="relative w-100 bg-white shadow-xl rounded-md">
    <div class="flex justify-between items-center p-4">
      <h2 class="text-lg font-bold">Confirm Delete Transaction</h2>
      {#if !loading}
        <!-- svelte-ignore a11y-positive-tabindex -->
        <button
          class="w-8 h-8 flex justify-center items-center text-3xl hover:bg-gray-100 rounded-full"
          on:click={hide}
          tabindex="1"
        >
          &times;
        </button>
      {/if}
    </div>
    <div class="px-4 mt-1">
      Are you sure you want to delete {transactionTitle
        ? `the transaction "${transactionTitle}"`
        : 'this transaction'}?
    </div>
    <div class="flex justify-end p-4">
      {#if !loading}
        <Button class="mr-2" variant="secondary" rounded disabled={loading} on:click={hide}>
          Cancel
        </Button>
      {/if}
      <Button variant="danger" rounded disabled={loading} on:click={onConfirm}>
        {#if loading}
          <Loader height="90%" thickness="6px" color="white" />
        {:else}
          Delete
        {/if}
      </Button>
    </div>
  </div>
</Overlay>
