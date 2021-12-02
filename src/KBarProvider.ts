import { defineComponent, provide, h, PropType, watch } from "vue";
import { Action } from "./types";
import { InternalEvents } from "./InternalEvents";
import { useInternalState } from "./useInternalState";
import { KBarOptions } from ".";

export const DEFAULT_OPTIONS: KBarOptions = {
  placeholder: "Type a command or search…",
  disabled: false,
};

export default defineComponent({
  name: "KBarProvider",
  props: {
    options: {
      type: Object as PropType<Partial<KBarOptions>>,
      default: () => DEFAULT_OPTIONS,
    },
    actions: {
      type: Array as PropType<Action[]>,
      default: () => [],
    },
  },
  setup(props) {
    const { state, handler, matches } = useInternalState(
      {
        ...DEFAULT_OPTIONS,
        ...props.options,
      },
      props.actions
    );

    watch(
      () => props.options,
      () => {
        handler.value.setOptions({
          ...DEFAULT_OPTIONS,
          ...props.options,
        });
      },
      { deep: true }
    );

    provide("k-bar-state", state);
    provide("k-bar-handler", handler);
    provide("k-bar-matches", matches);
  },
  render() {
    return [this.$slots.default?.(), h(InternalEvents)];
  },
});
