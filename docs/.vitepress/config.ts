import { defineConfig } from "vitepress";

export default defineConfig({
  title: "@bytebase/vue-kbar",
  description: "Extensible command+k interface for Vue 3 applications.",
  themeConfig: {
    sidebar: {
      "/": getMainSidebar(),
    },
  },
});

function getMainSidebar() {
  return [
    {
      text: "Introduction",
      children: [
        { text: "What is vue-kbar", link: "/" },
        { text: "Getting started", link: "/intro/getting-started" },
      ],
    },
    {
      text: "Advanced",
      children: [
        { text: "Reactive actions", link: "/advanced/reactive-actions" },
        { text: "Sorting actions", link: "/advanced/sorting-actions" },
        { text: "Nested actions", link: "/advanced/nested-actions" },
        {
          text: "Enable / disable kbar",
          link: "/advanced/enable-disable-kbar",
        },
        {
          text: "Control kbar manually",
          link: "/advanced/control-kbar-manually",
        },
      ],
    },
  ];
}
