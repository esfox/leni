<script lang="ts">
  export let value: string | number = '';
  export let label = '';
  export let id = Date.now().toString();
  export let textarea = false;

  let className = '';
  export { className as class };

  const inputProps = { ...$$props };
  delete inputProps.class;
</script>

<div class={className}>
  <label for={id} class="block text-sm font-medium text-gray-700 mb-1 ml-1">{label}</label>
  {#if textarea}
    <textarea
      bind:value
      {id}
      class="w-full block border-2 rounded-lg overflow-y-auto p-2"
      {...inputProps}
    />
  {:else}
    <input bind:value {id} class="w-full border-2 rounded-lg p-2" {...inputProps} />
  {/if}
</div>
