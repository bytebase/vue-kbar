import { defineComponent, provide, h, PropType } from "vue";
import { Action } from "./types";
import { InternalEvents } from "./InternalEvents";
import { useInternalState } from "./useInternalState";
import { KBarOptions } from ".";

export const DEFAULT_OPTIONS: KBarOptions = {
  placeholder: "Type a command or search…",
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
    const options = {
      ...DEFAULT_OPTIONS,
      ...props.options,
    };

    const { state, handler, matches } = useInternalState(
      options,
      props.actions
    );

    provide("k-bar-state", state);
    provide("k-bar-handler", handler);
    provide("k-bar-matches", matches);
  },
  render() {
    return [this.$slots.default?.(), h(InternalEvents)];
  },
});
