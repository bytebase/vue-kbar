<template>
  <input
    ref="inputRef"
    auto-focus
    auto-complete="off"
    role="combobox"
    spell-check="false"
    :value="search"
    :placeholder="placeholder"
    v-bind="$attrs"
    @keydown="onKeyDown"
    @input="onInput"
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, watchEffect } from "vue";
import { useKBarHandler } from "./useKBarHandler";
import { useKBarState } from "./useKBarState";

export default defineComponent({
  name: "KBarSearch",
  emits: {
    input: (e: InputEvent) => true,
  },
  setup(props, { emit }) {
    const state = useKBarState();
    const handler = useKBarHandler();
    const inputRef = ref<HTMLInputElement | null>(null);

    const maybeFocus = () => {
      if (state.value.visibility === "visible") {
        inputRef.value?.focus();
      }
    };
    watchEffect(maybeFocus);
    watch(() => state.value.currentRootActionId, maybeFocus);

    function onInput(e: Event) {
      emit("input", e as InputEvent);
      const input = e.target as HTMLInputElement;
      handler.value.setSearch(input.value);
      // options?.callbacks?.onQueryChange?.(event.target.value);
    }

    function onKeyDown(e: KeyboardEvent) {
      if (
        e.key === "Backspace" &&
        !state.value.search &&
        !!state.value.currentRootActionId
      ) {
        const current = state.value.actions.find(
          (act) => act.id === state.value.currentRootActionId
        );
        if (current) {
          handler.value.setCurrentRootAction(current.parent);
        }
      }
    }

    const placeholder = computed(() => {
      if (state.value.currentRootActionId) {
        const action = state.value.actions.find(
          (act) => act.id === state.value.currentRootActionId
        );
        if (action) return action.name;
      }
      return state.value.options.placeholder;
    });

    return {
      search: computed(() => state.value.search),
      placeholder,
      inputRef,
      onInput,
      onKeyDown,
    };
  },
});
</script>
