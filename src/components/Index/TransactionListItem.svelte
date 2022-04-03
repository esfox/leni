<script lang="ts">
  import classNames from 'classnames';
  import { formatCurrency, formatDate } from 'src/helpers/common';

  export let amount = 0;
  export let title = '';
  export let date = '';

  $: amountString = formatCurrency(amount);
  $: dateString = formatDate(date);
</script>

<tr class="w-full items-center not-last:(border-b border-b-light)-900">
  <td class={classNames('w-[10rem] p-4', amount > 0 ? 'text-green-600' : 'text-red-600')}>
    {amountString}
  </td>
  <td>{title}</td>
  <td class="w-[10rem]">
    <small class="text-dark-50">{dateString}</small>
  </td>
</tr>
