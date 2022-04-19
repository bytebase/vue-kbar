<script setup>
import {  watch } from "vue";
import { useKBarState, useKBarHandler, useKBarMatches } from "../src";

const state = useKBarState();
const handler = useKBarHandler();
const matches = useKBarMatches();

const disabled = window.__kbar_disabled;
</script>

# hello

<label for="focus-test">To test focus management: </label><input name="focus-test" />

<label for="disabled">Disable kbar</label><input name="disabled" type="checkbox" v-model="disabled" />

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
