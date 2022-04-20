<template>
  <KBarProvider :actions="initialActions" :options="{ disabled }">
    <KBarPortal>
      <KBarPositioner style="z-index: 1000; background: var(--a3)">
        <KBarAnimator
          style="
            max-width: calc(75 * var(--unit));
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
              padding: calc(2 * var(--unit)) calc(2 * var(--unit));
              font-size: calc(2 * var(--unit));
              width: 100%;
              box-sizing: border-box;
              outline: none;
              border: none;
              background: var(--background);
              color: var(--foreground);
            "
          />
          <RenderResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>

    <Layout />
  </KBarProvider>
</template>

<script>
import { defineComponent, ref } from "vue";
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
import RenderResults from "./RenderResults.vue";

export default defineComponent({
  name: "KBarLayout",
  components: {
    Layout,
    KBarProvider,
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    KBarSearch,
    RenderResults,
  },
  setup() {
    const initialActions = [
      {
        id: "foo",
        name: "Foo",
        shortcut: ["f", "o", "o"],
        section: "Navigation",
        perform: () => alert("yahaha! you found foo!"),
      },
      {
        id: "bar",
        name: "Bar",
        subtitle: "This action contains hidden keywords",
        keywords: "baz",
        perform: () => alert("bar"),
      },

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
    // function paddingLeft(str, len, pad = " ") {
    //   str = "" + str;
    //   while (str.length < len) str = pad + str;
    //   return str.substr(str.length - len);
    // }
    // for (let i = 0; i < 200; i++) {
    //   initialActions.push(
    //     createAction({
    //       name: `Fake Action #${paddingLeft(i + 1, 3, "0")}`,
    //       section: "Fake",
    //       keywords: ["fff"],
    //     })
    //   );
    // }

    const disabled = ref(false);
    window.__kbar_disabled = disabled;

    return {
      initialActions,
      disabled,
    };
  },
});
</script>
