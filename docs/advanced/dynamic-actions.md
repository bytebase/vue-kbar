# Dynamic actions

You may register actions dynamically by calling `useRegisterActions` in any descendant component of `<KBarProvider>`. This hook method is reactive and bound to the component's life cycle, so you don't need to refresh or unregister manually. Here is an example.

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
