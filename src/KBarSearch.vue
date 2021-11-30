<template>
  <input
    ref="input"
    auto-focus
    auto-complete="off"
    role="combobox"
    spell-check="false"
    :value="search"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { useKBarState } from "./useKBarState";

export default defineComponent({
  name: "KBarSearch",
  setup() {
    const state = useKBarState();
    const input = ref<HTMLInputElement | null>(null);

    watchEffect(() => {
      if (state.value.visibility === "visible") {
        input.value && input.value.focus();
      }
    });

    return {
      search: state.value.search,
      input,
    };
  },
});
</script>
