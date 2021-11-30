<template>
  <teleport to="body">
    <template v-if="visible">
      <slot />
    </template>
  </teleport>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useKBarState } from "./useKBarState";

export default defineComponent({
  name: "KBarPortal",
  setup() {
    const state = useKBarState();

    const visible = computed(() => state.value.visibility !== "hidden");

    return {
      visible,
    };
  },
});
</script>
