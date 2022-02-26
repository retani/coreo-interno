<script>
  import { Meteor } from "meteor/meteor";
  import { Scenes } from '../api/scenes.js'

  let scenes = [];

  Meteor.subscribe('scenes');

  $m: {
    scenes = Scenes.find({}, { sort: { key: 1 } }).fetch();
  }

</script>

<h3>Scenes</h3>
<ol class="container">
  {#each scenes as scene}
    <li>
      {JSON.stringify(scene,null,2)}
    </li>
  {/each}
</ol>

<style>

  h3, .container {
    font-size: 80%;
    opacity: 0.8;
  }

  li {
    border-bottom: 1px solid #ccc;
    padding: 1ex 0;
    white-space: pre;
  }

  * {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }
</style>>