
<script>
  import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';
  import { Sessions } from '../api/sessions.js'
  import PlayerA from './PlayerA.svelte'
  import QrCode from "svelte-qrcode"
  import ScenePlayer from './ScenePlayer.svelte';

  let sessionId
  let session
  let scenes
  let phoneUrl
  let welcome = true

  onMount(async () => {
    Meteor.call('sessions.init', (error, result) => {
      if (error) {
        console.warn(error);
      } else {
        sessionId = result;
        console.log(sessionId)
        Meteor.subscribe('session', sessionId);
      }
    });
  });

  $m: {
    if (sessionId) {
      session = Sessions.findOne(sessionId);
      phoneUrl = `${window.location.origin}/#/phone/${sessionId}`
      if (session) {
        scenes = session.scenes;
      }
    }
  }

</script>

<div class="container">
  {#if Meteor.isDevelopment}
    <pre>
    {JSON.stringify(session, null, 2)}
    </pre>
  {/if}

  <h1>coreografías para uso interno</h1>

  {#if welcome}
    <h2>Welcome to the show. Please get your phone</h2>
    <button on:click={() => welcome = false}>Continue</button>
  {:else}
    {#if session && !session.phone}
    <ol>
      <li>
        Scan the QR code with your phone
        <br />
        <a href={phoneUrl} target="_blank">
          <QrCode value={phoneUrl} />
          <br />
          {phoneUrl}
        </a>
      </li>
      <li>
        Follow the instructions on the phone
      </li>
    </ol>
    {/if}
  {/if}

  {#if session}

    {#each scenes as scene}
      <ScenePlayer 
        {sessionId}
        {scene} 
        place="computer" 
      />
    {/each}
  {/if}

</div>

<style>
  
  .video:not(.withPhone) {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  pre {
    opacity: 0.3;
    font-size: 65%;
    position: fixed;
    bottom:0;
    right:0;
    z-index: 1;
    text-shadow: 0 0 1px #000;
  }
</style>
