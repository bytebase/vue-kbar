# Nested actions

::: tip
Open kbar on this page to have a try!
:::

Nested actions are useful when we need to manage our actions as a tree or something like that. Here's an example of how the current page provides nested actions.

```typescript
useRegisterActions([
  defineAction({
    id: "theme",
    name: "Change theme…",
    keywords: "interface color dark light",
    section: "Preferences",
  }),
  defineAction({
    id: "theme-dark",
    name: "Dark",
    keywords: "dark theme",
    section: "",
    parent: "theme",
    perform: (actionImpl) => {
      document.querySelector("html").classList.add("dark");
    },
  }),
  defineAction({
    id: "theme-light",
    name: "Light",
    keywords: "light theme",
    section: "",
    parent: "theme",
    perform: (actionImpl) => {
      document.querySelector("html").classList.remove("dark");
    },
  }),
]);
```

See that `parent` field? It indicates which one the nested action belongs to.

`name` and `keywords` of nested actions can also be searched by the input query. Pressing <kbd>backspace</kbd> when we navigated in a nested action leads us back to it's parent action.

<script setup>
import { storeToRefs } from 'pinia';
import { useRegisterActions, defineAction } from '../../src';
import { useStore } from '../.vitepress/store';

const { darkMode } = storeToRefs(useStore());

useRegisterActions([
  defineAction({
    id: "theme",
    name: "Change theme…",
    keywords: "interface color dark light",
    section: "Preferences",
  }),
  defineAction({
    id: "theme-dark",
    name: "Dark",
    keywords: "dark theme",
    section: "",
    parent: "theme",
    perform: (actionImpl) => {
      darkMode.value = true;
    },
  }),
  defineAction({
    id: "theme-light",
    name: "Light",
    keywords: "light theme",
    section: "",
    parent: "theme",
    perform: (actionImpl) => {
      darkMode.value = false;
    },
  }),
]);
</script>
