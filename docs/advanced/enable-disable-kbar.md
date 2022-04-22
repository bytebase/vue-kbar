# Enable / disable kbar

<script setup>
import { storeToRefs } from 'pinia';
import { useStore } from "../.vitepress/store.ts";

const { disabled } = storeToRefs(useStore());
</script>

We might want to disable our kbar temporarily (or permanently) sometimes. Here's an example

::: tip Live demo

<p style="display: flex; align-items: center;">
  <label for="disabled">Try to disable kbar</label>
  <input name="disabled" type="checkbox" v-model="disabled" style="margin: 0; margin-left: var(--unit); margin-top: 2px;" />
</p>
:::
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
