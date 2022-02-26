<script>
  import { Meteor } from "meteor/meteor";
  import { Sessions } from '../api/sessions.js'

  let sessions = [];

  Meteor.subscribe('sessions');

  $m: {
    sessions = Sessions.find({}, { sort: { createdAt: -1 } }).fetch();
  }

</script>

<h3>Sessions</h3>
<ol class="container">
  {#each sessions as session}
    <li>
      <dl>
        <dt>
          start date
        </dt>
        <dd>
          {session.createdAt}
        </dd>
        <dt>
          phone connected
        </dt>
        <dd>
          {session.phone}
        </dd>
        <dt>
          current scene
        </dt>
        <dd>
          {session.currentScene}
        </dd>
        {#each session.scenes as scene}
          <dt>
            scene {scene.key}
          </dt>
          <dd>
            - {[
              scene.computerCanplaythrough && "PC_loaded",
              scene.phoneCanplaythrough && "Phone_loaded",
              scene.paused ? "" : "playing", 
            ].join(" ")}
            
          </dd>
        {/each}
      </dl>
    </li>
  {/each}
</ol>

<style>

  h3, .container {
    font-size: 80%;
    opacity: 0.8;
  }
  dt {
    float: left;
    width: 12em;
  }

  li {
    border-bottom: 1px solid #ccc;
    padding: 1ex 0;
  }

  * {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }
</style>>