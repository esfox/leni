<script lang="ts">
  import { onDestroy } from 'svelte';

  export let shown = false;
  let element: HTMLDivElement;

  const toggle = () => (shown = !shown);

  const handleOutsideClick = ({ target }: MouseEvent) => {
    if (element && !element.contains(target as Element)) {
      shown = false;
    }
  };

  $: {
    if (shown) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }
  }

  onDestroy(() => document.removeEventListener('click', handleOutsideClick));
</script>

<div bind:this={element} class="relative">
  <slot name="activator" click={toggle} />
  {#if shown}
    <div class="absolute right-0 z-50">
      <slot />
    </div>
  {/if}
</div>
