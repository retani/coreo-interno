<script>
  import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';
  import { Sessions } from '../api/sessions.js'

  export let videoUrl
  export let sessionId

  let session

  onMount(async () => {
    if (sessionId) {
      Meteor.subscribe('session', sessionId);
      Meteor.call('sessions.update', sessionId, {
        ...session,
        phone: true
      });
    }
  });

  $m: session = Sessions.findOne(sessionId);

</script>

<!--
{videoUrl}
{sessionId}
{JSON.stringify(session)}-->

<button on:click={() => {
  if (session) {
    Meteor.call('sessions.update', sessionId, {
      ...session,
      paused: !session.paused
    });
  }
}}>
  {#if session && session.paused}
    Play
  {:else}
    Pause
  {/if}
</button>

<video bind:paused={session.paused}>
  <source src={videoUrl} type="video/mp4">
</video>

<style>
  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>