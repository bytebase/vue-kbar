<script setup>
import { useKBarState, useKBarHandler, useKBarMatches } from "../src";

const state = useKBarState();
const handler = useKBarHandler();
const matches = useKBarMatches();

</script>

# hello

<label for="focus-test">To test focus management: </label><input name="focus-test" />

:::warning
This is WIP!
:::

state:

<pre>
{{ JSON.stringify(state, null, "  ") }}
</pre>

handler:

<pre>
{{ JSON.stringify(handler, null, "  ") }}
</pre>

matches:

<pre>
{{ JSON.stringify(matches, null, "  ") }}
</pre>
