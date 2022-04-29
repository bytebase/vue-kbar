<template>
  <teleport v-if="mounted" to="body">
    <template v-if="visible">
      <slot />
    </template>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useMounted } from "@vueuse/core";
import { useKBarState } from "./useKBarState";

export default defineComponent({
  name: "KBarPortal",
  setup() {
    const state = useKBarState();
    const mounted = useMounted();

    const visible = computed(() => state.value.visibility !== "hidden");

    return {
      mounted,
      visible,
    };
  },
});
</script>
