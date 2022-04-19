import { defineConfig } from "vitepress";

export default defineConfig({
  title: "@bytebase/vue-kbar",
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
        { text: "Dynamic actions", link: "/advanced/dynamic-actions" },
        { text: "Sorting actions", link: "/advanced/sorting-actions" },
        { text: "Nested actions", link: "/advanced/nested-actions" },
        {
          text: "Enable / disable kbar",
          link: "/advanced/enable-disable-kbar",
        },
        { text: "Control kbar manually", link: "/advanced/control-kbar-manually" },
      ],
    },
  ];
}
