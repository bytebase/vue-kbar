import DefaultTheme from "vitepress/theme";
import KBarLayout from "./KBarLayout.vue";
import "./style.css";

export default {
  ...DefaultTheme,
  Layout: KBarLayout,
};
