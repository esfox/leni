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
  export let disabled = false;
  export let noPadding = false;
</script>

<button
  class={classNames(
    'font-bold text-white overflow-hidden',
    'disabled:(bg-green-600 opacity-75 cursor-not-allowed transition)',
    'focus:(outline-none ring-3 ring-green-300)',
    !noPadding && 'px-4 py-2',
    basic && 'bg-green-600 hover:bg-green-700',
    (text || icon) && 'focus:ring-0 bg-transparent hover:bg-green-700',
    icon && 'rounded-full',
    outlined &&
      'bg-transparent text-green-600 border-2 border-green-600 hover:(bg-green-700 text-white)',
    rounded && 'rounded-lg',
    fab &&
      'fab bg-green-600 hover:bg-green-700 w-16 h-16 grid place-items-center rounded-full text-5xl shadow-xl',
    $$props.class
  )}
  {disabled}
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
