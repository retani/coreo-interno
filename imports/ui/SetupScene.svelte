
<script>
  import { 
    getCloudCmdIdFromUrl,
    cloudCmdIdToUrl,
    sceneTemplate,
  } from '../lib/helpers.js'

  export let scene

  let video1Id = getCloudCmdIdFromUrl(scene.video1Url)
  let video2Id = getCloudCmdIdFromUrl(scene.video2Url)
  let img1Id = getCloudCmdIdFromUrl(scene.img1Url)
  let img2Id = getCloudCmdIdFromUrl(scene.img2Url)
  let title = scene.title
  let sceneNumber = scene.key + 1

  $: saved = 
      scene.video1Url==cloudCmdIdToUrl(video1Id) && 
      scene.video2Url==cloudCmdIdToUrl(video2Id) &&
      scene.img1Url==cloudCmdIdToUrl(img1Id) &&
      scene.img2Url==cloudCmdIdToUrl(img2Id) &&
      scene.title==title

  function handleSubmit(event) {
      Meteor.call("scenes.update", {
        ...scene,
        title,
        img1Url: cloudCmdIdToUrl(img1Id),
        img2Url: cloudCmdIdToUrl(img2Id),
        video1Url: cloudCmdIdToUrl(video1Id),
        video2Url: cloudCmdIdToUrl(video2Id)
      });
  };  

</script>

<div class="container">

  <hr>
  
    <h2>Scene #{sceneNumber}: {title}</h2>

    <form on:submit|preventDefault={handleSubmit}>
      <div class="title">
      <h4>Title</h4>
      <input type="text" bind:value={title} placeholder={getCloudCmdIdFromUrl(sceneTemplate.title)}>
      </div>
      <div class="videos">
        <label>
          <h4>Video Computer (filename)</h4>
          <input type="text" bind:value={video1Id} placeholder={getCloudCmdIdFromUrl(sceneTemplate.video1Url)}>
          <br /><br />
          {#if video1Id}
            {#key video1Id}
              <video controls>
                  
                    <source src={cloudCmdIdToUrl(video1Id)} type='video/mp4' data-name={video1Id}>
                  <track kind="captions" default>
              </video>
            {/key}
          {/if}
          <br>
          <h4>Image Computer (filename)</h4>
          <input type="text" bind:value={img1Id} placeholder={getCloudCmdIdFromUrl(sceneTemplate.img1Url)}>
          <br><br>
          {#if img1Id}
            {#key img1Id}
              <img src={cloudCmdIdToUrl(img1Id)} alt="poster">
            {/key}
          {/if}
        </label>
        <label>
          <h4>Video Phone (filename)</h4>
          <input type="text" bind:value={video2Id} placeholder={getCloudCmdIdFromUrl(sceneTemplate.video2Url)}>
          <br /><br />
          {#if video2Id}
            {#key video2Id}
              <video controls>
                  <source src={cloudCmdIdToUrl(video2Id)} type='video/mp4'>
                  <track kind="captions" default>
              </video>
            {/key}
          {/if}
          <br>
          <h4>Image Computer (filename)</h4>
          <input type="text" bind:value={img2Id} placeholder={getCloudCmdIdFromUrl(sceneTemplate.img2Url)}>
          <br><br>
          {#if img1Id}
            {#key img1Id}
              <img src={cloudCmdIdToUrl(img2Id)} alt="poster">
            {/key}
          {/if}
        </label>
      </div>
      <button disabled={saved} type="submit">
        Save Scene #{sceneNumber}
        {#if saved}
          (saved)
        {:else}
          (not saved)
        {/if}
      </button>
    </form>
    
</div>

<style>
  .videos {
    display: flex;
    flex-direction: row;
  }

  .title {
    background-color: #222;
    padding: 10px;
  }
  label {
    flex: 1;
    background-color: #222;
    display: block;
    padding: 10px;
  }
  video {
    width: 100%;
    outline: 1px white solid;
  }
  input {
    width: 100%;
    display: inline-block;
    box-sizing: border-box;
  }

  button {
    margin: 1em 0;
  }
  button:not([disabled]) {
    background-color: orange;
  }
</style>