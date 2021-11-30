<template>
  <KBarProvider :actions="initialActions">
    <KBarPortal>
      <KBarPositioner>
        <KBarAnimator
          style="
            max-width: 600px;
            width: 100%;
            background: var(--background);
            color: var(--foreground);
            border-radius: var(--unit);
            overflow: hidden;
            box-shadow: var(--shadow);
          "
        >
          <KBarSearch
            style="
              padding: 12px 16px;
              font-size: 16px;
              width: 100%;
              box-sizing: border-box;
              outline: none;
              border: none;
              background: var(--background);
              color: var(--foreground);
            "
          />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>

    <Layout />
  </KBarProvider>
</template>

<script>
import { defineComponent } from "vue";
import DefaultTheme from "vitepress/theme";
const { Layout } = DefaultTheme;
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  createAction,
} from "../../../src";

export default defineComponent({
  name: "KBarLayout",
  components: {
    Layout,
    KBarProvider,
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    KBarSearch,
  },
  setup() {
    const initialActions = [
      {
        id: "foo",
        name: "Foo",
        perform: () => console.log("foo"),
      },
      {
        id: "bar",
        name: "Bar",
        subtitle: "This action contains hidden keywords",
        keywords: "baz",
        perform: () => console.log("bar"),
      },
      createAction({
        id: "theme",
        name: "Change theme…",
        keywords: "interface color dark light",
        section: "Preferences",
      }),
      createAction({
        id: "theme-dark",
        name: "Dark",
        keywords: "dark theme",
        section: "",
        parent: "theme",
        perform: (actionImpl) => {
          console.log("change theme to dark");
        },
      }),
      createAction({
        id: "theme-light",
        name: "Light",
        keywords: "light theme",
        section: "",
        parent: "theme",
        perform: (actionImpl) => {
          console.log("change theme to light");
        },
      }),

      // {
      //   id: "homeAction",
      //   name: "Home",
      //   shortcut: ["h"],
      //   keywords: "back",
      //   section: "Navigation",
      //   perform: () => history.push("/"),
      //   icon: <HomeIcon />,
      //   subtitle: "Subtitles can help add more context.",
      // },
      // {
      //   id: "docsAction",
      //   name: "Docs",
      //   shortcut: ["g", "d"],
      //   keywords: "help",
      //   section: "Navigation",
      //   perform: () => history.push("/docs"),
      // },
      // {
      //   id: "contactAction",
      //   name: "Contact",
      //   shortcut: ["c"],
      //   keywords: "email hello",
      //   section: "Navigation",
      //   perform: () => window.open("mailto:timchang@hey.com", "_blank"),
      // },
      // {
      //   id: "twitterAction",
      //   name: "Twitter",
      //   shortcut: ["t"],
      //   keywords: "social contact dm",
      //   section: "Navigation",
      //   perform: () => window.open("https://twitter.com/timcchang", "_blank"),
      // },
      // createAction({
      //   name: "Github",
      //   shortcut: ["g", "h"],
      //   keywords: "sourcecode",
      //   section: "Navigation",
      //   perform: () => window.open("https://github.com/timc1/kbar", "_blank"),
      // }),
    ];
    return {
      initialActions,
    };
  },
});
</script>

<style>
:root {
  --background: rgb(252 252 252);
  --a1: rgba(0 0 0 / 0.05);
  --a2: rgba(0 0 0 / 0.1);
  --foreground: rgb(28 28 29);
  --shadow: 0px 6px 20px rgb(0 0 0 / 20%);

  --unit: 8px;
}
</style>
