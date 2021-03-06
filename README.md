# vue-kbar

Extensible command+k interface for Vue 3 applications. Inspired by [timc1/kbar](https://github.com/timc1/kbar).

> Caution! This is still WIP.

## Screenshots

> TBD

## How to use

### 1. Install dependency

```bash
# npm install --save @bytebase/vue-kbar
```

or if you are using yarn

```bash
# yarn add @bytebase/vue-kbar
```

### 2. Import core components

```typescript
// App.vue

import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  createAction,
} from "@bytebase/vue-kbar";
```

### 3. Define global actions

```typescript
// App.vue

// use `createAction` as a type definition helper
const globalActions = [
  createAction({
    id: "home",
    name: "Home",
    shortcut: ["g", "h"],
    section: "Navigation",
    subtitle: "Go back to home",
    perform: () => router.push("/"),
  }),
  createAction({
    id: "docs",
    name: "Docs",
    shortcut: ["g", "d"],
    section: "Navigation",
    perform: () => router.push("/docs"),
  }),
];
```

### 4. Use core components

You need to wrap your Vue app entrance by vue-kbar core components.

vue-kbar comes with no out-of-the-box styles. You may specify styles according to your application's UI design. Here is an example of using tailwindcss.

```html
<KBarProvider :actions="globalActions">
  <KBarPortal>
    <KBarPositioner class="bg-gray-300 bg-opacity-80">
      <KBarAnimator
        class="bg-white shadow-lg rounded-lg w-128 overflow-hidden divide-y"
      >
        <KBarSearch
          class="px-3 py-4 text-lg w-full box-border outline-none border-none"
        />
        <MyResultsRenderer />
        <!-- see below -->
      </KBarAnimator>
    </KBarPositioner>
  </KBarPortal>

  <!-- you application entrance here -->
  <MyApp />
</KBarProvider>
```

### 5. Implement a results renderer

vue-kbar doesn't render results it self. You may render results with your components and styles.

Here is a simple example of how to implement `<MyResultsRenderer />` above.

```html
// MyResultsRenderer.vue

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

### 6. Register actions dynamically

You may register actions dynamically by calling `useRegisterActions` in any descendant component of `<KBarProvider>`. This hook method is reactive and bound to the component's life cycle, so you don't need to refresh or unregister manually. Here is an example.

```typescript
// SomeComponent.vue

import { useRegisterActions, createAction } from "@bytebase/vue-kbar";

export default {
  name: "SomeComponent",
  setup() {
    // Maybe you've already used some auto-fetch stuff to
    // update the `posts` automatically
    const posts = useFetch("/your-api", [deps]);

    // Mapping posts to actions as a computed
    const actions = computed(() =>
      posts.map((post) =>
        createAction({
          id: `to-detail-${post.id}`,
          name: post.title,
          subtitle: post.abstract,
          section: "Posts",
          perform: () => router.push(`/post/${post.id}`),
        })
      )
    );

    // Dynamically register actions
    // pass `prepend: true` to make them listed before global actions
    // When `actions` changed, they will be automatically re-registered
    useRegisterActions(actions, true);
  },
};
```
