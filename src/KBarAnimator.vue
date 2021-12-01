<template>
  <div ref="outerRef" class="k-bar-animator" style="pointer-events: auto">
    <slot />
  </div>
</template>

<script lang="ts">
import { useEventListener } from "@vueuse/core";
import { defineComponent, Ref, ref, watchEffect } from "vue";
import { useKBarHandler } from "./useKBarHandler";
import { useKBarState } from "./useKBarState";

export default defineComponent({
  name: "KBarAnimator",
  setup() {
    const state = useKBarState();
    const handler = useKBarHandler();

    watchEffect(() => {
      const { visibility } = state.value;
      if (visibility === "entering") {
        requestAnimationFrame(() => {
          handler.value.setVisibility("visible");
        });
      }
      if (visibility === "leaving") {
        requestAnimationFrame(() => {
          handler.value.setVisibility("hidden");
        });
      }
    });

    const outerRef = ref<HTMLDivElement | null>(null);
    useClickOutside(outerRef, () => {
      handler.value.hide();
    });

    return { outerRef };
  },
});

function useClickOutside(
  domRef: Ref<HTMLElement | null>,
  cb: (e: Event) => void
) {
  const handler = (e: Event) => {
    if (domRef.value?.contains(e.target as any)) {
      return;
    }
    cb(e);
  };
  useEventListener("mousedown", handler, true);
  useEventListener("touchstart", handler, true);
}
</script>
