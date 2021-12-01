import { defineComponent, provide, h, PropType } from "vue";
import { Action } from "./types";
import { InternalEvents } from "./InternalEvents";
import { useInternalState } from "./useInternalState";

export default defineComponent({
  name: "KBarProvider",
  props: {
    actions: {
      type: Array as PropType<Action[]>,
      default: () => [],
    },
  },
  setup(props) {
    const { state, handler, matches } = useInternalState({}, props.actions);

    provide("k-bar-state", state);
    provide("k-bar-handler", handler);
    provide("k-bar-matches", matches);
  },
  render() {
    return [h(InternalEvents), this.$slots.default?.()];
  },
});
