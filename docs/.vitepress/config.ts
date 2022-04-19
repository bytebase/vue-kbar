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
        { text: "Getting Started", link: "/intro/getting-started" },
      ],
    },
    {
      text: "Advanced",
      children: [
        { text: "Nested Actions", link: "/advanced/nested-actions" },
        { text: "Dynamic Actions", link: "/advanced/dynamic-actions" },
        { text: "Enable / Disable kbar", link: "/advanced/enable-disable-kbar" },
      ],
    },
  ];
}
