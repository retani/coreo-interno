<script>
  import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';
  import { Sessions } from '../api/sessions.js'
  import { Jumper } from 'svelte-loading-spinners'

  export let videoUrl
  export let sessionId

  let session

  const sub = Meteor.subscribe('session', sessionId);

  onMount(async () => {
    if (sessionId) {
      Meteor.call('sessions.update', sessionId, {
        ...session,
        phone: true
      });
    }
  });

  $m: session = Sessions.findOne(sessionId);

  function canplaythrough() {
    if (session) {
      Meteor.call('sessions.update', sessionId, {
        ...session,
        phoneCanplaythrough: true
      });
    }
  }

  function loadstart() {
    if (session) {
      Meteor.call('sessions.update', sessionId, {
        ...session,
        phoneLoadstart: true
      });
    }
  }

  $: canPlay = session // && session.phoneCanplaythrough && session.computerCanplaythrough;

</script>

<!--
{videoUrl}
{sessionId}
{JSON.stringify(session)}-->

{#if session && session.paused}
  <ol>
    <li>
      Put this phone in landscape mode
    </li>
    <li>
      Place it on the palm of your hand and keep it there
    </li>
    <li>
      {#if canPlay}
        Press Play:
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
      {:else}
        <Jumper />
      {/if}
    </li>
  </ol>
{/if}


{#if sub.ready}
  <video 
    playsinline 
    bind:paused={session.paused}
    on:canplaythrough={canplaythrough}
    on:loadstart={loadstart}
    >
    <source src={videoUrl} type="video/mp4">
  </video>
{/if}

<style>
  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>