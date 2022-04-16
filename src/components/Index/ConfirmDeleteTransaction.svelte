<script lang="ts">
  import Overlay from 'src/components/Overlay.svelte';
  import Button from '../Button.svelte';
  import Loader from '../Loader.svelte';
  import Modal from '../Modal.svelte';

  export let shown = false;
  export let loading = false;
  export let transactionTitle: string = undefined;
  export let onConfirm = () => {};

  const hide = () => (shown = false);
</script>

<Overlay bind:shown persistent>
  <Modal title="Confirm Delete Transaction" onClose={hide}>
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
  </Modal>
</Overlay>
