<script>
  import { compile } from 'mdsvex';

  export let key
  export let texts

  const value = texts.find(t => t.key === key).value

</script>


{#await compile(value) then compiled}
  {@html compiled.code}
{/await}