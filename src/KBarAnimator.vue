<template>
  <slot />
</template>

<script>
import { defineComponent, watchEffect } from "vue";
import { useKBarState } from "./useKBarState";

export default defineComponent({
  name: "KBarAnimator",
  setup() {
    const state = useKBarState();
    watchEffect(() => {
      const { visibility } = state.value;
      if (visibility === "entering") {
        requestAnimationFrame(() => {
          state.value.visibility = "visible";
        });
      }
      if (visibility === "leaving") {
        requestAnimationFrame(() => {
          state.value.visibility = "hidden";
        });
      }
    });
  },
});
</script>
