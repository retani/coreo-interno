
<script>
  import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';
  import { Sessions } from '../api/sessions.js'
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

</script>

<div class="container">
  <!--{JSON.stringify(session)}-->

  <h1>coreografías para uso interno</h1>

  {#if session && session.phone}
    <video 
        bind:paused={session.paused}
        on:canplaythrough={canplaythrough}
        on:loadstart={loadstart}
      >
        <source src={videoUrl} type='video/mp4'>
    </video>
  {:else}
  {#if welcome}
    <h2>Welcome to the show. Please get your phone</h2>
    <button on:click={() => welcome = false}>Continue</button>
    {:else}
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
</div>

<style>
  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>
