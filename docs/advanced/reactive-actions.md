# Dynamic actions

## Global actions

Global actions can be a reactive array. Take the actions in [Getting started](../intro/getting-started.html) as an example.

```typescript
const globalActions = computed(() => [
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
]);
```

Wrap your action generation logic with `computed`. vue-kbar accepts reactive array (`Action[] | Ref<Action[]`>), thus makes your global actions reactive.

## Dynamic actions

You may register actions dynamically by calling `useRegisterActions` in any descendant component of `<KBarProvider>`. Here is an example.

```typescript
// SomeComponent.vue
import { useRegisterActions, defineAction } from "@bytebase/vue-kbar";

export default {
  name: "SomeComponent",
  setup() {
    // Maybe you've already used some auto-fetch stuff to
    // update the `posts` automatically
    const posts = useFetch("/your-api", [deps]);

    // Mapping posts to actions as a computed
    const actions = computed(() =>
      posts.map((post) =>
        defineAction({
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
    useRegisterActions(actions);
  },
};
```

Your dynamic actions registered by `useRegisterActions` can also be a static or reactive array.

This hook method is reactive and it has been bound to the component's life cycle, so you don't need to re-register them when your component updated, or unregister manually when your component unmounted.
