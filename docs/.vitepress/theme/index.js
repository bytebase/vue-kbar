import DefaultTheme from "vitepress/theme";
import { createPinia } from "pinia";
import KBarLayout from "./KBarLayout.vue";
import "./style.css";

export default {
  ...DefaultTheme,
  Layout: KBarLayout,
  enhanceApp({ app }) {
    const pinia = createPinia();
    app.use(pinia);
  },
};
