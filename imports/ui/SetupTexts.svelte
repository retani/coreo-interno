<script>
  import SaveButton from './SaveButton.svelte';

  export let texts = []
  // clone texts into changedTexts

  let changedTexts = texts.map(text => {
    return { ...text }
  })

  function handleSubmit(event) {
      Meteor.call("texts.update", changedTexts);
  };

  let saved = true
  $: {
    console.log(JSON.stringify(texts), JSON.stringify(changedTexts), saved)
    saved = JSON.stringify(texts) === JSON.stringify(changedTexts)
  }

</script>

<div class="container">

  <form on:submit|preventDefault={handleSubmit}>

    {#each changedTexts as text}
      <label>
        {text.key}
        <input type="text" bind:value={text.value} />
      </label>
    {/each}

    <SaveButton {saved} />

  </form>

</div>

<style>
  label {
    display: block;
  }
</style>