<script>
  import { onMount, createEventDispatcher } from 'svelte'

  export let src 
  export let loaded = false
  export let paused = true

  const dispatch = createEventDispatcher();

  let videoElem

  onMount(() => {
    var r = new XMLHttpRequest();
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

<video bind:this={videoElem} bind:paused={paused} />