# Getting started

## 1. Install dependency

```bash
➜ npm install --save @bytebase/vue-kbar
```

Feel free to use pnpm / yarn ... and other package management tools.

## 2. Import core components

```typescript
// App.vue
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  defineAction,
} from "@bytebase/vue-kbar";
```

## 3. Define global actions

```typescript
// App.vue
// use `defineAction` as a type definition helper
const globalActions = [
  defineAction({
    id: "home",
    name: "Home",
    shortcut: ["g", "h"],
    section: "Navigation",
    subtitle: "Go back to home",
    perform: () => router.push("/"),
  }),
  defineAction({
    id: "docs",
    name: "Docs",
    shortcut: ["g", "d"],
    section: "Navigation",
    perform: () => router.push("/docs"),
  }),
];
```

## 4. Use core components

You need to wrap your Vue app entrance by vue-kbar core components.

vue-kbar comes with no out-of-the-box styles. You may specify styles according to your application's UI design. Here is an example using [tailwindcss](https://tailwindcss.com/).

```html
<KBarProvider :actions="globalActions">
  <KBarPortal>
    <KBarPositioner class="bg-gray-300 bg-opacity-80">
      <KBarAnimator class="bg-white shadow-lg rounded-lg w-128 overflow-hidden divide-y">
        <KBarSearch class="px-3 py-4 text-lg w-full box-border outline-none border-none" />
        <MyResultsRenderer /> <!-- see below -->
      </KBarAnimator>
    </KBarPositioner>
  </KBarPortal>

  <!-- you application entrance here -->
  <MyApp />
</KBarProvider>
```

## 5. Implement a results renderer

vue-kbar doesn't render results it self. You may render results with your components and styles.

Here is a simple example of how to implement `<MyResultsRenderer />` above.

```html
<!-- MyResultsRenderer.vue -->
<KBarResults
  :items="matches.results"
  :item-height="itemHeight"
  class="max-h-96"
>
  <!-- KBarResults creates a virtual list to manage mass of actions -->
  <!-- It also reacts to up/down/enter keystroke for activeIndex management -->
  <!-- You still may use your own component if you really want to customize the result list -->
  <template #item="{ item, index, active }">
    <div v-if="typeof item === 'string'" class="section">
      <!-- string items are section headers -->
      <!-- now we just render them as plain texts -->
      {{ item }}
    </div>
    <div v-else class="item" :class="{ active }">
      <!-- render featured actions -->
      <div class="main">{{ item.name }}</div>
      <span v-if="item.subtitle" class="subtitle"> {{ item.subtitle }} </span>
    </div>
  </template>
</KBarResults>
```

```typescript
// MyResultsRenderer.vue
import { useKBarMatches, KBarResults } from "@bytebase/vue-kbar";

export default {
  name: "MyResultsRenderer",
  components: { KBarResults },
  setup() {
    // Visit the latest matches
    const matches = useKBarMatches();

    // Tell KBarResults the height of each item will be rendered
    const itemHeight = (params: { item: any; index: number }) => {
      if (typeof params.item === "string") return 32;
      return 64;
    };

    return { matches, itemHeight };
  },
};
```
