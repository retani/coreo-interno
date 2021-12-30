
<script>
  import { 
    getCloudCmdIdFromUrl,
    cloudCmdIdToUrl
  } from '../lib/helpers.js'

  export let scene

  let video1Id = getCloudCmdIdFromUrl(scene.video1Url)
  let video2Id = getCloudCmdIdFromUrl(scene.video2Url)

  function handleSubmit(event) {
      Meteor.call("scenes.update", {
        ...scene,
        video1Url: cloudCmdIdToUrl(video1Id),
        video2Url: cloudCmdIdToUrl(video2Id)
      });
  };  

</script>


<div class="container">
  <a href="/">Home</a>

  
    <h1>coreografías para uso interno</h1>

    <form on:submit|preventDefault={handleSubmit}>
      <label>
        Video Computer (filename):
        <input type="text" bind:value={video1Id} placeholder="cui_synch_test_1_computer_smaller.mp4">
        <br />
        {#if video1Id}
            <video controls>
                <source src={cloudCmdIdToUrl(video1Id)} type='video/mp4'>
            </video>
        {/if}
      </label>
      <br />
      <label>
        Video Phone (filename):
        <input type="text" bind:value={video2Id} placeholder="cui_synch_test_1_telephone_smaller.mp4">
        <br />
        {#if video2Id}
          <video controls>
              <source src={cloudCmdIdToUrl(video2Id)} type='video/mp4'>
          </video>
        {/if}
      </label>
      <br />
      <button disabled={!scene || scene.video1Url==cloudCmdIdToUrl(video1Id) && scene.video2Url==cloudCmdIdToUrl(video2Id)} type="submit">Save</button>
    </form>

    <pre>
      How to setup videos:
      1. upload to https://media.intergestalt.dev/ into folder "coreo"
      2. make sure that there are no whitespaces in the name (right click -> rename)!
      3. enter the file name into filed above, e.g.: cui_synch_test_1_computer_smaller.mp4
      4. save (reload to check)
    </pre>

    

</div>

<style>
  video {
    width: 20%;
    min-width: 300px;
  }
  input {
    min-width: 50%;
  }
</style>