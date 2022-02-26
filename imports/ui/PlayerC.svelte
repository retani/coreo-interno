<script>
  /* download file completely before , using link rel=refetch
  *  - works on chrome
  *  - does not work on ios safari
  */

  import { onMount, createEventDispatcher } from 'svelte'

  export let src 
  export let type = "video/mp4"
  export let muted = false
  export let loaded = false
  export let paused = true

  const dispatch = createEventDispatcher();

  let percentComplete = 0
  let bytesLoaded = 0
  let videoElemSrc = null
  let videoElem = null
  let loadElem = null

  onMount(()=>{
    loadElem.onload= ()=> {
      console.log("loadElem.onload")
      dispatch('loaded', { loaded: true } )
      loaded=true
    }
  })

  dispatch('loadstart', { loaded: false });
  //dispatch('progress', { percentComplete })

  //dispatch('loaded', { loaded: true });

</script>

<!--
  Loaded {percentComplete}% ({(bytesLoaded / (1024*1024)).toFixed(2)} MB)
-->

  <link rel="prefetch" as="video" href={src} bind:this={loadElem}>

  <video 
    bind:this={videoElem} 
    bind:paused={paused}
    on:ended
    {muted}
    playsinline
    >
    <track kind="captions" />
    {#if loaded}
      <source src={src} {type}>
    {/if}
  </video>

<style>
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>