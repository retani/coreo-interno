<script>
  /* download file completely before play */

  import { onMount, createEventDispatcher } from 'svelte'

  export let src 
  export let type = "video/mp3"
  export let loaded = false
  export let paused = true

  const dispatch = createEventDispatcher();

  let percentComplete = 0
  let bytesLoaded = 0
  let videoElemSrc = null

  let videoElem

  onMount(() => {
    var r = new XMLHttpRequest();
    r.onprogress = function(e) {
      if (e.lengthComputable) {
        const p = Math.round((e.loaded / e.total) * 100, 2);
        if (p != percentComplete) {
          percentComplete = p
          dispatch('progress', { percentComplete })
          bytesLoaded = e.loaded
        }
        //dispatch('progress', {
        //  loaded: e.loaded,
        //  total: e.total,
        //  percent: percentComplete
        //})
      }
    }
    r.onload = function() {
      videoElemSrc = URL.createObjectURL(r.response);
      loaded = true
      console.log("loaded")
      dispatch('loaded', { loaded: true });
    };

    // if (myVid.canPlayType('video/mp4;codecs="avc1.42E01E, mp4a.40.2"')) {
    //     r.open("GET", "slide.mp4");
    // }
    // else {
    //     r.open("GET", "slide.webm");
    // }
    
    r.open("GET", src);

    r.responseType = "blob";
    r.send();

    dispatch('loadstart', { loaded: false });
  })

</script>

<!--
  Loaded {percentComplete}% ({(bytesLoaded / (1024*1024)).toFixed(2)} MB)
-->


  <video 
    bind:this={videoElem} 
    bind:paused={paused}
    on:ended
    playsinline
    >
    <track kind="captions" />
    {#if loaded}
      <source src={videoElemSrc} {type}>
    {/if}
  </video>

<style>
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>