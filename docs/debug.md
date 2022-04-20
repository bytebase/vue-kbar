<script setup>
import {  watch } from "vue";
import { storeToRefs } from 'pinia';
import { useKBarState, useKBarHandler, useKBarMatches } from "../src";
import { useStore } from "./.vitepress/store.ts";

const state = useKBarState();
const handler = useKBarHandler();
const matches = useKBarMatches();

const { disabled } = storeToRefs(useStore());
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
