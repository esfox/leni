<script lang="ts">
  export let title: string;
  export let onClose: () => void;
</script>

<div class="relative w-full bg-white shadow-xl rounded-md sm:w-100">
  <slot name="title">
    {#if title || onClose}
      <div class="flex justify-between items-center p-4">
        {#if title}
          <h2 class="text-lg font-bold">{title}</h2>
        {/if}
        {#if onClose}
          <!-- svelte-ignore a11y-positive-tabindex -->
          <button
            class="w-8 h-8 grid place-items-center self-start text-3xl hover:bg-gray-100 rounded-full"
            on:click={onClose}
            tabindex="1"
          >
            <i class="fa-solid fa-close fa-xs" />
          </button>
        {/if}
      </div>
    {/if}
  </slot>
  <slot />
</div>
