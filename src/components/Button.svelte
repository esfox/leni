<script lang="ts">
  import classNames from 'classnames';

  export let width = 'unset';
  export let height = '48px';
  export let fab = false;
  export let outlined = false;
  export let text = false;
  export let icon = false;
  export let basic = !fab && !outlined && !text && !icon;
  export let rounded = false;
  export let noPadding = false;

  type ButtonVariants = 'primary' | 'secondary' | 'danger';
  export let variant: ButtonVariants = 'primary';
</script>

<button
  class={classNames(
    'font-bold text-white overflow-hidden',
    'disabled:(opacity-75 cursor-not-allowed transition)',
    'focus:(outline-none ring-green-300 ring-3)',

    !noPadding && 'px-4 py-2',

    basic && variant === 'primary' && 'bg-green-600 hover:bg-green-700',

    basic &&
      variant === 'secondary' &&
      'bg-gray-100 text-black hover:bg-gray-200 focus:ring-gray-200',

    basic && variant === 'danger' && 'bg-red-500 hover:bg-red-600 focus:ring-red-200',

    (text || icon) && 'focus:ring-0 bg-transparent hover:bg-gray-100',

    icon && 'rounded-full px-4',

    outlined && 'bg-transparent border-2 hover:text-white',

    outlined && variant === 'primary' && 'text-green-600 border-green-600 hover:bg-green-600',

    outlined && variant === 'danger' && 'text-red-500 border-red-500 hover:bg-red-500',

    rounded && 'rounded-lg',

    fab &&
      'fab bg-green-600 hover:bg-green-700 w-16 h-16 grid place-items-center rounded-full text-5xl shadow-xl',

    $$props.class
  )}
  disabled={$$props.disabled}
  type={$$props.type}
  style={`--width: ${width}; --height: ${height}`}
  on:click
>
  <slot />
</button>

<style>
  button:not(.fab) {
    width: var(--width);
    height: var(--height);
  }
</style>
