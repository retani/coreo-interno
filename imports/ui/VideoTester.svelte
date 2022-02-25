<script>
  import PlayerA from './PlayerA.svelte';

  export let videoUrl

  let paused = true

  let loading = {
    video: true,
    PlayerA: true,
  }

  function play() {
    console.log("play")
    paused = !paused
  }

  function loaded(name) {
    console.log('loaded ' + name)
    loading = {...loading, ["loaded_"+name]: true}
  }

  function ended(name) {
    loading = {...loading, ["ended_"+name]: true}
  }

  // videoUrl = "https://upload.wikimedia.org/wikipedia/commons/a/a4/BBH_gravitational_lensing_of_gw150914.webm"

</script>

<div class="container">
  <a href="/">Home</a>
  <br />
  <br />

  <div>
    <a href={videoUrl}>
    {videoUrl}
    </a>
  </div>
  
  <!--div class="vidcontainer" data-name="video">
    <video 
      playsinline
      preload="metadata"
      on:canplaythrough={() => loaded("video")} 
      on:error={(e) => alert("video error")}
      bind:paused={paused}>
      <track kind="captions" />
      <source src={videoUrl} type="video/mp4">
    </video>
  </div-->
  
  <div class="video" class:loading={!loading.loaded_PlayerA}>
    <div 
      class="video-inner"
      data-name="PlayerA" class:playing={!paused} 
    >
      <PlayerA 
        src={videoUrl}   
        type='video/mp4'
        on:loaded={() => loaded("PlayerA")} 
        bind:paused={paused}
        on:ended={()=>ended("PlayerA")}
      />
    </div>
  </div>

  <div>
    {JSON.stringify(loading,null,2)}
  </div>

</div>

<button on:click={play}>play</button>

<style>

  .video {
    width: 300px;
    overflow: hidden;
    height: 0;
    height: calc(300px * 9 / 16);
    outline: 1px solid #ccc;
    background-image:url(/couple.gif);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    position: relative;
  }
  .video:not(.loading) {
    background-image:none;
    background-color: lime;
  }
  .video-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>