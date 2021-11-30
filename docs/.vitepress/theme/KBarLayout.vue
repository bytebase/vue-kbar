<template>
  <KBarProvider>
    <KBarPortal>
      <KBarPositioner>
        <KBarAnimator>
          <KBarSearch />
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
});
</script>
