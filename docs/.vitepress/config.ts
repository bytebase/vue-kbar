import { defineConfig } from "vitepress";
import { getMainSidebar } from "./toc";
import { resolve } from "path";

const PROJECT_ROOT = resolve(__dirname, "../../");
const resolvePath = (rel: string) => resolve(PROJECT_ROOT, rel);

export default defineConfig({
  title: "@bytebase/vue-kbar",
  description: "Extensible command+k interface for Vue 3 applications.",
  base: '/vue-kbar',
  outDir: resolvePath("./dist_docs"),
  themeConfig: {
    sidebar: {
      "/": getMainSidebar(),
    },
  },
});
