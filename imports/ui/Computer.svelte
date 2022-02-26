
<script>
  import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';
  import { Sessions } from '../api/sessions.js'
  import TextWelcome from './texts/Welcome.svelte';
  import TextScan from './texts/Scan.svelte';
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

  const next = () => welcome = false

</script>

<div class="container">
  {#if Meteor.isDevelopment}
    <pre>
    {JSON.stringify(session, null, 2)}
    </pre>
  {/if}

  <!--a href="https://pocimasvisuales.com/#conjuro">
    &lt; Back to module
  </a-->

  {#if welcome}

    <TextWelcome {next} />

  {:else}
    {#if session && !session.phone}
    <TextScan>
      <a href={phoneUrl} target="_blank">
        <QrCode value={phoneUrl} />
        <br />
        <!--{phoneUrl}-->
      </a>
    </TextScan>
    {/if}
  {/if}

  {#if session}

    {#each scenes as scene}
      {#if session.currentScene === scene.key || (
          //session.currentScene > 0 && 
          session.currentScene+1 === scene.key && 
          scenes.find(s=>s.key==scene.key-1).phoneCanplaythrough &&
          scenes.find(s=>s.key==scene.key-1).computerCanplaythrough
        )}
        <ScenePlayer 
          {sessionId}
          {scene} 
          place="computer" 
          hidden={session.currentScene+1 === scene.key || !session.phone}
        />
      {/if}
    {/each}


    {#if session.currentScene > scenes.length-1}
      <h2>Thank you for your participation</h2>
      <p>
        <a href="https://pocimasvisuales.com/#resources">
          &lt; Continue to resources
        </a>
      </p>
    {/if}

  {/if}

</div>

<style>
  
  pre {
    display: none;
    font-size: 1.3vmin;
    position: fixed;
    top:0;
    right:0;
    width: 100%;
    height: 100%;
    overflow: auto;
    z-index: 1;
    color: #0005;
    text-shadow: 0 0 1px white;
    pointer-events: none;
  }
</style>
