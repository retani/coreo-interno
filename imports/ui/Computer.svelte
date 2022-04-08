
<script>
  import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';
  import Clipboard from "svelte-clipboard";
  import { Sessions } from '../api/sessions.js'
  import QrCode from "svelte-qrcode"
  import ScenePlayer from './ScenePlayer.svelte';
  import Text from './Text.svelte';

  export let texts

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

    <Text {texts} key="Welcome" />
    
    <p class="button">
      <button on:click={next}>COMENZAR</button>
    </p>

  {:else}
    {#if session && !session.phone}

      <Text {texts} key="Scan1" />

      <div class="code">
        <Clipboard
          text={phoneUrl}
          let:copy
          on:copy={() => {
            console.log('Copied to clipboard', phoneUrl);
          }}>
          <div on:click={copy}>
            <QrCode value={phoneUrl} />
            <br />
            <!--{phoneUrl}-->
          </div>
        </Clipboard>
      </div>
      
    <Text {texts} key="Scan2" />
  
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
    <Text {texts} key="ComputerThanks" />
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
