# Enable / disable kbar

<script setup>
import {  watch } from "vue";
import { storeToRefs } from 'pinia';
import { useKBarState, useKBarHandler, useKBarMatches } from "../../src";
import { useStore } from "../.vitepress/store.ts";

const state = useKBarState();
const handler = useKBarHandler();
const matches = useKBarMatches();

const { disabled } = storeToRefs(useStore());
</script>


::: tip
<p style="display: flex; align-items: center;">
<label for="disabled">Try to disable kbar</label>
<input name="disabled" type="checkbox" v-model="disabled" style="margin: 0; margin-left: var(--unit); margin-top: 2px;" />
</p>
:::

You might want to disable your kbar temporarily (or permanently) sometimes. Here's an example

```html
<KBarProvider :actions="globalActions" :options="{ disabled }">
  ...
</KBarProvider>
```

See that `disabled` state? Let's define it.

```typescript
import { KBarProvider } from "@bytebase/vue-kbar";

export default defineComponent({
  components: {
    KBarProvider,
  },
  setup() {
    const disabled = getDisabledStateSomewhere();

    const globalActions = getActionsSomewhere();

    return {
      globalActions,
      disabled,
    };
  },
});
```

In this example, we defined a computed value according to the value of `disabled`. So we can dynamically disable or enable kbar via updating its value.
