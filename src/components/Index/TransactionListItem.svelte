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

  $: amountString = formatCurrency(amount);
  $: dateString = formatDate(date);

  const handleDelete = () => {
    showingMenu = false;
    onDelete();
  };
</script>

<tr class="w-full items-center not-last:(border-b border-b-light)-900">
  <td class={classNames('w-[10rem] p-4', amount > 0 ? 'text-green-600' : 'text-red-600')}>
    {amountString}
  </td>
  <td>{title}</td>
  <td class="w-[10rem]">
    <small class="text-dark-50">{dateString}</small>
  </td>
  <td class="w-[1rem]">
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
  </td>
</tr>
