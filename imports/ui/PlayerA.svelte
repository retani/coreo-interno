<script>
  import { onMount, createEventDispatcher } from 'svelte'

  export let src 
  export let loaded = false
  export let paused = true

  const dispatch = createEventDispatcher();

  let percentComplete = 0
  let bytesLoaded = 0

  let videoElem

  onMount(() => {
    var r = new XMLHttpRequest();
    r.onprogress = function(e) {
      if (e.lengthComputable) {
        percentComplete = Math.round((e.loaded / e.total) * 100, 2);
        bytesLoaded = e.loaded
        //dispatch('progress', {
        //  loaded: e.loaded,
        //  total: e.total,
        //  percent: percentComplete
        //})
      }
    }
    r.onload = function() {
      videoElem.src = URL.createObjectURL(r.response);
      loaded = true
      dispatch('load', {});
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
  })

</script>

Loaded {percentComplete}% ({(bytesLoaded / (1024*1024)).toFixed(2)} MB)
<video 
  bind:this={videoElem} 
  bind:paused={paused}
  playsinline
  >
  <track kind="captions" />
  <source {src} type="video/mp3">
</video>