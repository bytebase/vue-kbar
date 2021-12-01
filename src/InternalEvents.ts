import { useEventListener } from "@vueuse/core";
import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  watch,
  watchEffect,
} from "vue";
import { useKBarHandler, useKBarState } from ".";

export const InternalEvents = defineComponent({
  name: "KBarInternalEvents",
  setup() {
    useToggleHandler();
    useFocusHandler();
    useDocumentLock();
    useShortcuts();
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

/**
 * `useDocumentLock` is a simple implementation for preventing the
 * underlying page content from scrolling when kbar is open.
 */
function useDocumentLock() {
  const state = useKBarState();

  watchEffect(() => {
    const { visibility } = state.value;
    if (visibility === "entering") {
      document.body.style.pointerEvents = "none";
      document.body.style.overflow = "hidden";

      let scrollbarWidth = getScrollbarWidth();

      // take into account the margins explicitly added by the consumer
      const mr = getComputedStyle(document.body).marginRight;
      if (mr) {
        // remove non-numeric values; px, rem, em, etc.
        scrollbarWidth += Number(mr.replace(/\D/g, ""));
      }
      document.body.style.marginRight = scrollbarWidth + "px";
    } else if (visibility === "hidden") {
      document.body.style.removeProperty("pointer-events");
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("margin-right");
    }
  });
}

/**
 * `useShortcuts` registers and listens to keyboard strokes and
 * performs actions for patterns that match the user defined `shortcut`.
 */
function useShortcuts() {
  const state = useKBarState();
  const handler = useKBarHandler();

  const buffer: string[] = [];
  let lastKeyStrokeTime = 0;

  useEventListener("keydown", (event) => {
    const key = event.key?.toLowerCase();

    if (shouldRejectKeystrokes() || event.metaKey || key === "shift") {
      return;
    }

    const currentTime = Date.now();

    if (currentTime - lastKeyStrokeTime > 400) {
      buffer.length = 0;
    }

    buffer.push(key);
    lastKeyStrokeTime = currentTime;
    const bufferString = buffer.join("");

    const { actions } = state.value;
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      if (!action.shortcut || action.shortcut.length === 0) {
        continue;
      }
      if (action.shortcut.join("") === bufferString) {
        event.preventDefault();
        console.log("should perform", bufferString, action);
        if (action.children?.length > 0) {
          handler.value.setCurrentRootAction(action.id);
          handler.value.show();
        } else {
          action.perform?.(action);
        }
        buffer.length = 0;
        break;
      }
    }
  });

  watch(
    () => state.value.actions,
    () => {
      buffer.length = 0;
    }
  );
}

function getScrollbarWidth() {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  document.body.appendChild(outer);
  const inner = document.createElement("div");
  outer.appendChild(inner);
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode!.removeChild(outer);
  return scrollbarWidth;
}

function shouldRejectKeystrokes(
  {
    ignoreWhenFocused,
  }: {
    ignoreWhenFocused: string[];
  } = { ignoreWhenFocused: [] }
) {
  const inputs = ["input", "textarea", ...ignoreWhenFocused].map((el) =>
    el.toLowerCase()
  );

  const activeElement = document.activeElement;
  const ignoreStrokes =
    activeElement &&
    (inputs.indexOf(activeElement.tagName.toLowerCase()) !== -1 ||
      activeElement.attributes.getNamedItem("role")?.value === "textbox" ||
      activeElement.attributes.getNamedItem("contenteditable")?.value ===
        "true");

  return ignoreStrokes;
}
