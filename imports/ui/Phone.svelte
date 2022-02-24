<script>
  import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';
  import { Sessions } from '../api/sessions.js'
  import { Jumper } from 'svelte-loading-spinners'
  import PlayerA from './PlayerA.svelte'

  export let scenes = null
  export let sessionId

  let session
  
  onMount(async () => {
    if (sessionId) {
      Meteor.subscribe('session', sessionId);
      Meteor.call('sessions.update', sessionId, {
        phone: true
      });
    }
  });

  $m: {
    if (sessionId) {
      session = Sessions.findOne(sessionId);
      if (session) {
        scenes = session.scenes;
      }
    }
  }


  function canplaythrough(scene) {
    if (session) {
      Meteor.call('sessions.updateScene', {sessionId, scene}, {
        phoneCanplaythrough: true
      });
    }
  }

  function progress(scene, progress) {
    if (session) {
      // Meteor.call('sessions.updateScene', {sessionId, scene}, {
      //   phoneProgress: progress.detail
      // });
    }
  }

</script>

<!--{JSON.stringify(session,null,2)}-->

<!--
{videoUrl}
{sessionId}
{JSON.stringify(session)}
-->

<!--
{session}
{session.phoneProgress}
{session.computerProgress}
-->

{#if session}
  <ol>
    <li>
      Put this phone in landscape mode
    </li>
    <li>
      Place it on the palm of your hand and keep it there
    </li>
    <li>
      Press the play button when ready
    </li>
  </ol>

  {#each scenes as scene}
    <h4>{scene.key}</h4>
    <!--{JSON.stringify(scene,null,2)}-->
    {#if scene.canPlay}
      Press Play:
      <button on:click={() => {
        if (session) {
          Meteor.call('sessions.updateScene', {sessionId, scene}, {
            paused: !scene.paused
          });
        }}}>
          {#if scene.paused}
            Play
          {:else}
            Pause
          {/if}
      </button>
    {:else}
      <Jumper />
    {/if}

    <div class="video">
      <PlayerA 
        src={scene.video2Url}
        type='video/mp4'
      bind:paused={scene.paused}
      on:loaded={()=>canplaythrough(scene)}
      on:progress={p=>progress(scene, p)}
      />
    </div>
  {/each}

{/if}

<style>
  .video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>
