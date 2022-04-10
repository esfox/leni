<script lang="ts">
  import classNames from 'classnames';
  import { formatCurrency, formatDate } from 'src/helpers/common';
  import Button from '../Button.svelte';
  import Popup from '../Popup.svelte';

  export let amount = 0;
  export let title = '';
  export let date = '';
  export let onDelete = () => {};

  let showingMenu = false;

  $: amountString = formatCurrency(Math.abs(amount));
  $: dateString = formatDate(date);

  const handleDelete = () => {
    showingMenu = false;
    onDelete();
  };
</script>

<div
  class="
    w-full grid
    grid-cols-[max(10rem)_1fr_auto_max(2rem)]
    grid-rows-[1fr]
    <sm:(
      grid-cols-[1fr_auto]
      grid-rows-[1fr_1fr]
    )
    items-center
    not-last:(border-b border-b-light)-900"
>
  <div
    class={classNames(
      'font-bold px-5 py-3 <sm:(text-xl) sm:(max-w-[10rem] px-4 py-4)',
      amount > 0 ? 'text-green-600' : 'text-red-600'
    )}
  >
    {amount < 0 ? '−' : ''}
    {amountString}
  </div>
  <div class="<sm:(text-sm order-1 p-5 pt-0)">
    {title}
  </div>
  <div class="<sm:(order-2 p-5 pt-0) sm:px-4">
    <small class="text-dark-50">{dateString}</small>
  </div>
  <div class="<sm:(text-right px-4)">
    <Popup bind:shown={showingMenu}>
      <div slot="activator" let:click>
        <Button icon on:click={click}>
          <i class="fa-solid fa-ellipsis-vertical fa-lg text-dark-50" />
        </Button>
      </div>
      <ul class="bg-white shadow-md">
        <li
          role="button"
          class="flex items-center text-red-500 p-3 hover:bg-gray-50"
          on:click={handleDelete}
        >
          <i class="fa-solid fa-trash mr-3" />
          Delete
        </li>
      </ul>
    </Popup>
  </div>
</div>
