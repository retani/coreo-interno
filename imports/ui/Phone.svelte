<script>
  import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';
  import { Sessions } from '../api/sessions.js'
  import PhoneInstructions from './texts/PhoneInstructions.svelte'
  import ScenePlayer from './ScenePlayer.svelte';

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

  {#if session.currentScene > scenes.length-1}
    <h2>Thank you for your participation</h2>
  {:else}
    <PhoneInstructions />
  {/if}

  {#each scenes as scene}
    {#if session.currentScene === scene.key}
      <ScenePlayer 
        {sessionId}
        {scene} 
        place="phone" 
        muted
        controls
      />
    {/if}
  {/each}

{/if}

