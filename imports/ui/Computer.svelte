
<script>
  import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';
  import { Sessions } from '../api/sessions.js'
  import PlayerA from './PlayerA.svelte'
  import QrCode from "svelte-qrcode"

  export let videoUrl

  let sessionId
  let session
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
    }
  }

  function canplaythrough() {
    if (session) {
      Meteor.call('sessions.update', sessionId, {
        ...session,
        computerCanplaythrough: true
      });
    }
  }

  function loadstart() {
    if (session) {
      Meteor.call('sessions.update', sessionId, {
        ...session,
        computerLoadstart: true
      });
    }
  }

  function progress(progress) {
    if (session) {
      Meteor.call('sessions.update', sessionId, {
        ...session,
        computerProgress: progress.detail
      });
    }
  }

  onMount(loadstart);

</script>

<div class="container">
  <pre>
  {JSON.stringify(session, null, 2)}
  </pre>

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
    <div class="video" class:withPhone={session.phone}>
      <PlayerA 
        src={videoUrl} 
        type='video/mp4'
        bind:paused={session.paused}
        on:loaded={canplaythrough}
        on:progress={progress}
        on:loadstart={loadstart}
      />
    </div>
  {/if}

</div>

<style>
  .video {
    width: 100%;
  }

  
  .video:not(.withPhone) {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  pre {
    opacity: 0.1;
    position: fixed;
    bottom:0;
    right:0;
    text-shadow: 0 0 1px #000;
  }
</style>
