<script>
  import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';
  import { Sessions } from '../api/sessions.js'
  import PhoneInstructions from './texts/PhoneInstructions.svelte'
  import ScenePlayer from './ScenePlayer.svelte';
  import Thanks from './texts/Thanks.svelte';

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

{#if session}

  {#if session.currentScene > scenes.length-1}
    <Thanks place="phone"/>
  {:else}
    <PhoneInstructions />
  {/if}

  {#each scenes as scene}
      {#if session.currentScene === scene.key || (
        // session.currentScene > 0 && 
        session.currentScene+1 === scene.key && 
        scenes.find(s=>s.key==scene.key-1).phoneCanplaythrough &&
        scenes.find(s=>s.key==scene.key-1).computerCanplaythrough
      )}
      <ScenePlayer 
        {sessionId}
        {scene} 
        place="phone" 
        hidden={session.currentScene+1 == scene.key}
        muted
        controls
      />
    {/if}
  {/each}

{/if}

