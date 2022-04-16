<script lang="ts">
  import { formatDate } from 'src/helpers/common';
  import Button from '../Button.svelte';
  import Popup from '../Popup.svelte';
  import TransactionAmount from './TransactionAmount.svelte';

  export let amount = 0;
  export let title = '';
  export let date = '';
  export let notes = '';
  export let onDelete = () => {};

  let showingMenu = false;
  let showingNotes = false;

  $: dateString = formatDate(date);

  const doDelete = () => {
    showingMenu = false;
    onDelete();
  };

  const toggleNotes = () => {
    showingMenu = false;
    showingNotes = !showingNotes;
  };
</script>

<div
  class="
    w-full grid
    grid-cols-[max(10rem)_1fr_auto_auto]
    grid-rows-[1fr]
    <sm:(
      grid-cols-[auto_1fr]
      grid-rows-[1fr_auto_auto]
    )
    items-center
    not-last:(border-b border-b-light)-900"
>
  <TransactionAmount class="px-5 pt-5 pb-3 sm:(max-w-[10rem] p-4)" {amount} />
  <div class="<sm:(col-span-2 order-1 px-5 pt-1 pb-2)">
    {title}
  </div>
  <div class="<sm:(col-span-2 order-2 text-right px-5 pt-2 pb-4) sm:px-4">
    <small class="text-dark-50">{dateString}</small>
  </div>
  <div class="flex justify-end <sm:(text-right px-4 pt-2)">
    <Popup bind:shown={showingMenu}>
      <div slot="activator" let:click>
        <Button icon on:click={click}>
          <i class="fa-solid fa-ellipsis-vertical text-dark-50 sm:fa-lg" />
        </Button>
      </div>
      <ul class="min-w-10rem bg-white shadow-md">
        {#if !!notes}
          <li role="button" class="flex items-center p-3 hover:bg-gray-50" on:click={toggleNotes}>
            <i class="fa-solid fa-pencil mr-3" />
            {showingNotes ? 'Hide' : 'View'} Notes
          </li>
        {/if}
        <li
          role="button"
          class="flex items-center text-red-500 p-3 hover:bg-gray-50"
          on:click={doDelete}
        >
          <i class="fa-solid fa-trash mr-3" />
          Delete
        </li>
      </ul>
    </Popup>
  </div>
  {#if showingNotes}
    <div
      class="
        flex col-span-4 bg-light-300 rounded-xl pl-4 pr-3 pt-1 pb-4 mx-3 mt-1 mb-4
        <sm:(col-span-2 order-1 pl-5 pb-3 mb-0)
      "
    >
      <div class="flex-1 pt-1 sm:pt-2">
        <small class="text-dark-50 <sm:(text-xs)">Notes</small>
        <p class="notes whitespace-pre-wrap mt-1 <sm:(text-sm)">{notes}</p>
      </div>
      <Button class="px-3" icon on:click={toggleNotes}>
        <i class="fa-solid fa-eye-slash" />
      </Button>
    </div>
  {/if}
</div>

<style>
  .notes {
    overflow-wrap: anywhere;
  }
</style>
