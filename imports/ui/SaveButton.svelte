<script>
  export let disabled = false;
  export let saved = false;
</script>

<button type="submit" {disabled}>
  <slot></slot>
  {#if saved}
    (saved)
  {:else}
    (click to save)
  {/if}
</button>