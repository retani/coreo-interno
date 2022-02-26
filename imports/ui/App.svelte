<script>
    import {Route, router} from 'tinro'; 
    import Computer from './Computer.svelte';
    import Phone from './Phone.svelte';
    import Setup from './Setup.svelte';
    import Data from './Data.svelte';
    import SessionsInfo from './SessionsInfo.svelte';
    import VideoTester from './VideoTester.svelte';

    router.mode.hash(); // enables hash navigation method

    let scenes

</script>

<Data bind:scenes={scenes}>

  <!--div style="word-wrap: break-word; font-size:70%; white-space: pre;">
    {JSON.stringify(scenes,null,2)}
  </div-->

  {#if scenes}


    <Route path="/">
      <Computer {scenes}/>
    </Route>

    <Route path="/admin/*">
      <Route path="/">
        <a href="/admin/setup">Setup</a>
        <br/>
        <br/>
        <a href="/">Start on Computer</a>
        <br/>
        <br/>
        <a href="/test">Video Test</a>
        <br/>
        <br/>
        <SessionsInfo />
      </Route>

      <Route path="/setup">
        <Setup {scenes} />
      </Route>

      <Route path="/test">
        <VideoTester videoUrl={scenes[0].video1Url} />
      </Route>

    </Route>


    <Route path="/phone/:sessionId" let:meta>
      <Phone {scenes} sessionId={meta.params.sessionId}/>
    </Route>

  {:else}

    Loading...

  {/if}

</Data>