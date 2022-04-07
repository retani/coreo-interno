
<script>
  import SetupScene from './SetupScene.svelte'
  import SetupTexts from './SetupTexts.svelte'
  import { 
    getCloudCmdIdFromUrl,
    cloudCmdIdToUrl,
    sceneTemplate,
  } from '../lib/helpers.js'

  export let scenes
  export let texts

</script>


<div class="container">
  
  {#if scenes && scenes.length > 0 && texts && texts.length > 0}
    <h1> Texts </h1>

    <SetupTexts {texts} />

    <hr />

    <h1> Scenes </h1>
    
    How to setup videos:
    <ol>
    <li> upload to https://media.intergestalt.dev/ into folder "coreo"</li>
    <li> make sure that there are no whitespaces in the name (right click -> rename)!</li>
    <li> enter the file name into filed above, e.g.: {getCloudCmdIdFromUrl(sceneTemplate.video1Url)}</li>
    <li> save</li>
    </ol>

    {#each scenes as scene}
      <SetupScene scene={scene} />
    {/each}
  {:else}
    Loading... 
  {/if}

</div>

<style>
</style>