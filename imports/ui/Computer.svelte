
<script>
  import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';
  import { Sessions } from '../api/sessions.js'
  import QrCode from "svelte-qrcode"

  export let videoUrl

  let sessionId
  let session
  let phoneUrl

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

</script>

<div class="container">
  <!--{JSON.stringify(session)}-->

  {#if session && session.phone}
    <video bind:paused={session.paused}>
        <source src={videoUrl} type='video/mp4'>
    </video>
  {:else}
    <a href={phoneUrl} target="_blank">
      <QrCode value={phoneUrl} />
      {phoneUrl}
    </a>
  {/if}
</div>

<style>
  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>
