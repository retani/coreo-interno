
<script>
  import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Scenes } from '../api/scenes.js'


  export let scenes = null
  let currentUser;

  $: currentUser = useTracker(() => Meteor.user());

  const sceneStore = Scenes.find({}, { sort: { createdAt: -1 } });

  $: {
    if ($sceneStore && $sceneStore.length > 0) {
      scenes = [...$sceneStore].sort((a, b) => a.key - b.key);
    }
  }
  
  onMount(async () => {
    Meteor.subscribe('scenes');
  });

</script>


<div class="container">
  <slot />
</div>

