<script>
  import Player from './PlayerA.svelte'
  import { Meteor } from "meteor/meteor";

  export let sessionId
  export let scene
  export let place
  export let muted = false
  export let hidden = false
  export let controls = false

  const img = place == "computer" ? scene.img1Url : scene.img2Url

  $: loading = !scene.computerCanplaythrough || !scene.phoneCanplaythrough

  function canplaythrough(scene) {
    Meteor.call('sessions.updateScene', {sessionId, scene}, {
      [place + "Canplaythrough"]: true
    });
  }

  function ended(scene) {
    Meteor.call('sessions.updateScene', {sessionId, scene}, {
      //[place + "Ended"]: true,
      paused: true
    });
    Meteor.call('sessions.update', sessionId, {
      currentScene: scene.key+1
    });
  }

  function progress(scene, progress) {
    // Meteor.call('sessions.updateScene', {sessionId, scene}, {
    //   phoneProgress: progress.detail
    // });
  }
</script>

<div class:hidden class="container">
  {#if scene.title}
    <h4>{scene.title}</h4>
  {/if}
  {JSON.stringify(scene,null,2)}
  <div 
    style={`--poster: url(${img})`}
    class="video"
    class:loading
    class:paused={scene.paused}
    class:playButton={scene.paused && scene.computerCanplaythrough && scene.phoneCanplaythrough && controls}
    on:click={()=>{
        if (controls){
          Meteor.call('sessions.updateScene', {sessionId, scene}, {
            paused: !scene.paused
          });
        }
      }}
    >
    <div class="video-inner">
      <Player
        src={place == "computer" ? scene.video1Url : scene.video2Url}
        type='video/mp4'
        {muted}
        bind:paused={scene.paused}
        on:loaded={()=>canplaythrough(scene)}
        on:progress={p=>progress(scene, p)}
        on:ended={()=>ended(scene)}
      />
    </div>
  </div>
</div>

<style>
  .container.hidden {
    display: none;
  }
  .video {
    overflow: hidden;
    height: 0;
    padding-top: 56.25%;
    background-image:url(/couple.gif);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    background-color:white;
    position: relative;
  }
  .video-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .video.playButton::after {
    --size: 10vw;
    content: "";
    border: var(--size) solid transparent;
    border-left: calc(2 * var(--size) * 0.866) solid currentColor;
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: calc( 50% - var(--size) * 0.6 );
    transform: translateY(-50%);
  }
  .video.loading .video-inner, 
  .video.paused .video-inner {
    visibility: hidden;
  } 

  .video:not(.loading) {
    background-image: var(--poster);
    background-color: grey;
  }
</style>