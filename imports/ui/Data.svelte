
<script>
  import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Scenes } from '../api/scenes.js'

  const key = 0

  export let scene = null /*{
    key: 0,
    video1Id: null, // "12UBQm1nXeHLT2sClSJUjJ9qLql6czE2V",
    video2Id: null //"1BUT5eUPGtyTmiz1ZqWjfKI7xKGHGUEUF"
  }
 */ 
  let currentUser;

  $: currentUser = useTracker(() => Meteor.user());

  const sceneStore = Scenes.find({key}, { sort: { createdAt: -1 } });

  $: {
    if ($sceneStore && $sceneStore.length > 0) {
      scene = $sceneStore[0];
    }
  }
  
  onMount(async () => {
    Meteor.subscribe('tasks');
  });

</script>


<div class="container">
  <slot />
</div>

