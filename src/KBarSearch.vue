<template>
  <input
    ref="input"
    auto-focus
    auto-complete="off"
    role="combobox"
    spell-check="false"
    :value="search"
    @input="onInput"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { useKBarState } from "./useKBarState";

export default defineComponent({
  name: "KBarSearch",
  emits: {
    input: (e: InputEvent) => true,
  },
  setup(props, { emit }) {
    const state = useKBarState();
    const input = ref<HTMLInputElement | null>(null);

    watchEffect(() => {
      if (state.value.visibility === "visible") {
        input.value && input.value.focus();
      }
    });

    function onInput(e: InputEvent) {
      emit("input", e);
      const input = e.target as HTMLInputElement;
      state.value.search = input.value;
      // options?.callbacks?.onQueryChange?.(event.target.value);
    }

    // onInput={(event) => {
    //   props.onInput?.(event);
    //   query.setSearch(event.target.value);
    //   options?.callbacks?.onQueryChange?.(event.target.value);
    // }}
    // onKeyDown={(event) => {
    //   if (currentRootActionId && !search && event.key === "Backspace") {
    //     const parent = actions[currentRootActionId].parent;
    //     query.setCurrentRootAction(parent);
    //   }
    // }}

    return {
      search: state.value.search,
      input,
      onInput,
    };
  },
});
</script>
