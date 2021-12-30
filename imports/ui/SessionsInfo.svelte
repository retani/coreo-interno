<script>
  import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';
  import { Sessions } from '../api/sessions.js'

  let sessionId

  const sessionStore = Sessions.find({_id: sessionId});

  onMount(async () => {
    Meteor.subscribe('sessions');
  });

</script>

<h3>Sessions</h3>
<ol class="container">
  {#each $sessionStore as session}
    <li>
      {JSON.stringify(session)}
    </li>
  {/each}
</ol>
