<script>
  import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';
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
        {#each Object.entries(session) as [key, val]}
          <dt>
            {key}
          </dt>
          <dd>
            {val}
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