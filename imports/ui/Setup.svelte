
<script>
  import { 
    getGoogleDriveIdFromUrl,
    googleDriveIdToUrl
  } from '../lib/helpers.js'

  export let scene

  let video1Id = getGoogleDriveIdFromUrl(scene.video1Url)
  let video2Id = getGoogleDriveIdFromUrl(scene.video2Url)

  function handleSubmit(event) {
      Meteor.call("scenes.update", {
        ...scene,
        video1Url: googleDriveIdToUrl(video1Id),
        video2Url: googleDriveIdToUrl(video2Id)
      });
  };  

</script>


<div class="container">
  <a href="/">Home</a>

  
    <h1>coreografías para uso interno</h1>

    <form on:submit|preventDefault={handleSubmit}>
      <label>
        Video Computer (Google Drive Id):
        <input type="text" bind:value={video1Id} placeholder="1BUT5eUPGtyTmiz1ZqWjfKI7xKGHGUEUF">
        <br />
        {#if video1Id}
            <video controls>
                <source src={googleDriveIdToUrl(video1Id)} type='video/mp4'>
            </video>
        {/if}
      </label>
      <br />
      <label>
        Video Phone (Google Drive Id):
        <input type="text" bind:value={video2Id} placeholder="12UBQm1nXeHLT2sClSJUjJ9qLql6czE2V">
        <br />
        {#if video2Id}
            <video controls>
                <source src={googleDriveIdToUrl(video2Id)} type='video/mp4'>
            </video>
        {/if}
      </label>
      <br />
      <button disabled={!scene || scene.video1Url==googleDriveIdToUrl(video1Id) && scene.video2Url==googleDriveIdToUrl(video2Id)} type="submit">Save</button>
    </form>

    <pre>
      How to get Google Drive ID:
      - open video in google drive
      - three dots: open in new window
      - copy the id from the url, e.g. https://drive.google.com/file/d/12UBQm1nXeHLT2sClSJUjJ9qLql6czE2V/view
    </pre>

    

</div>

<style>
  video {
    width: 20%;
    min-width: 300px;
  }
</style>