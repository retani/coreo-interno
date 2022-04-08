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
    saved = JSON.stringify(texts) === JSON.stringify(changedTexts)
  }

</script>

<div class="container">

  <form on:submit|preventDefault={handleSubmit}>

    {#each changedTexts as text}
      <label>
        {text.key}
        <textarea bind:value={text.value}></textarea>
      </label>
    {/each}

    <SaveButton {saved} />

  </form>

</div>

<style>
  label {
    display: block;
  }
  textarea {
    box-sizing: border-box;
    width: 100%;
    height: 150px;
    border: 1px solid #ccc;
    padding: 10px;
  }
</style>