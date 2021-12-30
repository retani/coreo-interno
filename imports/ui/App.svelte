<script>
    import {Route, router} from 'tinro'; 
    import Computer from './Computer.svelte';
    import Phone from './Phone.svelte';
    import Setup from './Setup.svelte';
    import Data from './Data.svelte';
    import SessionsInfo from './SessionsInfo.svelte';

    router.mode.hash(); // enables hash navigation method

    let scene 

</script>

<Data bind:scene={scene}>

  <!--{JSON.stringify(scene)}-->

  {#if scene}

    <Route path="/">
      <a href="/setup">Setup</a>
      <br/>
      <br/>
      <a href="/computer">Start on Computer</a>
      <br/>
      <br/>
      <SessionsInfo />
    </Route>

    <Route path="/computer">
      <Computer videoUrl={scene.video1Url}/>
    </Route>

    <Route path="/setup">
      <Setup {scene} />
    </Route>

    <Route path="/phone/:sessionId" let:meta>
      <Phone videoUrl={scene.video2Url} sessionId={meta.params.sessionId}/>
    </Route>

  {:else}

    Loading...

  {/if}

</Data>