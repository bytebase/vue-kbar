# Reactive actions

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

Wrap our action generation logic with `computed`. vue-kbar accepts reactive array (`Action[] | Ref<Action[]`>), thus makes our global actions reactive.

## Dynamic actions

We may register actions dynamically by calling `useRegisterActions` in any descendant component of `<KBarProvider>`. Here is an example.

```typescript
// SomeComponent.vue
import { useRegisterActions, defineAction } from "@bytebase/vue-kbar";

export default {
  name: "SomeComponent",
  setup() {
    // Maybe we've already used some auto-fetch stuff to
    // update the `posts` automatically
    const posts = useFetch("/some-api/post", [deps]);

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

Our dynamic actions registered by `useRegisterActions` can also be a static or reactive array.

This hook method is reactive and it has been bound to the component's life cycle, so we don't need to re-register them when our component updated, or unregister manually when our component unmounted.

Open kbar on the current page, then we'll see some "Example actions" dynamically registered on this page. But when we leave this page, they will no longer exist.

<script setup>
import { useRegisterActions, defineAction } from '../../src';

function paddingLeft(str, len, pad = " ") {
  str = "" + str;
  while (str.length < len) str = pad + str;
  return str.substr(str.length - len);
}

const dynamicActions = [];
for (let i = 0; i < 5; i++) {
  dynamicActions.push(
    defineAction({
      id: `kbar.example.example#${i}`,
      name: `Example Action #${paddingLeft(i + 1, 2, "0")}`,
      section: "Example",
      perform: () => alert("Never mind, it's a example action"),
    })
  );
}

useRegisterActions(dynamicActions);
</script>
