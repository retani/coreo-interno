<script>
  /* simple plain video elem */

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
    videoElem.onload= ()=> {
      console.log("loadElem.onload")
      dispatch('loaded', { loaded: true } )
      loaded=true
    }
    videoElem.oncanplaythrough = ()=> {
      console.log("loadElem.oncanplaythrough")
      dispatch('loaded', { loaded: true } )
      loaded=true
    }
    videoElem.oncanplay = ()=> {
      console.log("loadElem.oncanplay")
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

  <!--link rel="prefetch" as="video" href={src} bind:this={loadElem}-->

  <video 
    preload="auto"
    bind:this={videoElem} 
    bind:paused={paused}
    on:ended
    {muted}
    playsinline
    >
    <track kind="captions" />
      <source src={src} {type}>
  </video>

<style>
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>