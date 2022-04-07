
<script>
  import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Scenes } from '../api/scenes.js'
  import { Texts } from '../api/texts.js'


  export let scenes = null
  export let texts = null
  let currentUser;

  $: currentUser = useTracker(() => Meteor.user());

  const sceneStore = Scenes.find({}, { sort: { createdAt: -1 } });
  const textsStore = Texts.find({});

  $: {
    if ($sceneStore && $sceneStore.length > 0) {
      scenes = [...$sceneStore].sort((a, b) => a.key - b.key);
    }
    if ($textsStore && $textsStore.length > 0) {
      texts = [...$textsStore];
    }
  }
  
  onMount(async () => {
    Meteor.subscribe('scenes');
    Meteor.subscribe('texts');
  });

</script>


<div class="container">
  <slot />
</div>

