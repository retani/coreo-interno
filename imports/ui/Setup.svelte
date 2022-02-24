
<script>
  import SetupScene from './SetupScene.svelte'
  import { 
    getCloudCmdIdFromUrl,
    cloudCmdIdToUrl,
    sceneTemplate,
  } from '../lib/helpers.js'

  export let scenes

</script>


<div class="container">
  <a href="/">Home</a>

  
  <h1>coreografías uso interno</h1>

  
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

</div>

<style>
</style>