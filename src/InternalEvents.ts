import { defineComponent, onMounted, onUnmounted, ref, watchEffect } from "vue";
import { useKBarHandler, useKBarState } from ".";

export const InternalEvents = defineComponent({
  name: "KBarInternalEvents",
  setup() {
    useToggleHandler();
    useFocusHandler();
  },
  render() {
    return null;
  },
});

function useToggleHandler() {
  const state = useKBarState();
  const handler = useKBarHandler();

  function keyDown(e: KeyboardEvent) {
    const showing = state.value.visibility !== "hidden";
    if (
      (e.metaKey || e.ctrlKey) &&
      e.key === "k" &&
      e.defaultPrevented === false
    ) {
      e.preventDefault();
      handler.value.toggle();

      if (showing) {
        // options.callbacks?.onClose?.();
      } else {
        // options.callbacks?.onOpen?.();
      }
    }
    console.log(e.key, showing);
    if (e.key === "Escape") {
      if (showing) {
        e.stopPropagation();
        // options.callbacks?.onClose?.();
      }

      handler.value.setVisibility((vs) => {
        console.log("set vs", vs);
        if (vs === "hidden" || vs === "leaving") {
          return vs;
        }
        return "leaving";
      });
    }
  }

  onMounted(() => {
    window.addEventListener("keydown", keyDown, true);
  });
  onUnmounted(() => {
    window.removeEventListener("keydown", keyDown, true);
  });
}

function useFocusHandler() {
  const state = useKBarState();

  const activeElement = ref<HTMLElement | null>(null);

  watchEffect(() => {
    if (
      state.value.visibility === "visible" ||
      state.value.visibility === "entering"
    ) {
      activeElement.value = document.activeElement as HTMLElement;
      return;
    }

    if (activeElement.value) {
      activeElement.value.focus();
    }
  });
}
