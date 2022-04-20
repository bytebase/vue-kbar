import { defineConfig } from "vitepress";
import { getMainSidebar } from "./toc";

export default defineConfig({
  title: "@bytebase/vue-kbar",
  description: "Extensible command+k interface for Vue 3 applications.",
  themeConfig: {
    sidebar: {
      "/": getMainSidebar(),
    },
  },
});
