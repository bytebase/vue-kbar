# Enable / disable kbar

You might want to disable your kbar temporarily (or permanently) sometimes. Here's an example

```html
<KBarProvider :actions="globalActions" :options="{ disabled }">
  ...
</KBarProvider>
```

See that `disabled` state? Let's define it.

```typescript
import { ref } from "vue";
import { KBarProvider } from "@bytebase/vue-kbar";

export default defineComponent({
  components: {
    KBarProvider,
  },
  setup() {
    const isSignedIn = get_this_somewhere();

    const globalActions = get_this_somewhere();

    const disabled = computed(() => {
      return !isSignedIn.value;
    });

    return {
      globalActions,
      disabled,
    };
  },
});
```

In this example, we defined a computed value according to the value of `isSignedIn`. So we can dynamically disable kbar when the user is not signed in.
