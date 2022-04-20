# Sorting actions

You probably want to sort your actions. Here's an example below

```html
<KBarProvider :actions="globalActions" :options="{ compare }">
  ...
</KBarProvider>
```

We passed an option `compare` to `<KBarProvider>`, let's see how it works.

```typescript
const compare = (a, b) => {
  if (a.item.data.priority !== b.item.data.priority) {
    return a.item.data.priority - b.item.data.priority;
  }

  return a.index - b.index;
};
```

`data` is an optional fields of `Action`. Allowing us to attach any type of data to the action as its meta data.

So we can implement custom sorting logic in `compare` via these extra information.
