<script lang="ts">
  import classNames from 'classnames';
  import { formatCurrency } from 'src/helpers/common';

  let className = '';
  export { className as class };
  export let amount = 0;

  $: amountString = formatCurrency(Math.abs(amount));
</script>

<div
  class={classNames(
    'font-bold <sm:(text-xl)',
    amount > 0 ? 'text-green-600' : 'text-red-600',
    className
  )}
>
  {amount < 0 ? '−' : ''}
  {amountString}
</div>
