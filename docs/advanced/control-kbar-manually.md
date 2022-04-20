# Control kbar manually

<script setup>
import { useKBarHandler } from "../../src";

const handler = useKBarHandler();
</script>

We can call `useKBarHandler()` to get a handler that provides some useful function to manually control kbar.

<p>
  <button class="btn-primary" @click="handler.show()">
  Open kbar
  </button>
</p>

```html
<button @click="handler.show()">Open kbar</button>
```

```typescript
import { useKBarHandler } from "@bytebase/vue-kbar";

const handler = useKBarHandler();
```