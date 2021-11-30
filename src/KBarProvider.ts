import { defineComponent, provide, Ref, ref, h } from "vue";
import {
  KBarState,
  KBarHandler,
  KBarMatches,
  Action,
  ActionId,
  VisualStateUpdateCallback,
  VisualState,
} from "./types";
import { InternalEvents } from "./InternalEvents";

export default defineComponent({
  setup() {
    const state = ref<KBarState>({
      search: "",
      actions: [],
      currentRootActionId: null,
      activeIndex: 0,
      visibility: "hidden",
    });
    const handler = ref<KBarHandler>({
      setSearch(search: string) {
        throw new Error("not implemented");
      },
      registerActions(actions: Action[]) {
        throw new Error("not implemented");
      },
      setCurrentRootAction(actionId: ActionId | null) {
        throw new Error("not implemented");
      },
      setVisibility(cb: VisualStateUpdateCallback | VisualState) {
        if (typeof cb === "function") {
          cb = cb(state.value.visibility);
        }
        state.value.visibility = cb;
      },
      toggle() {
        this.setVisibility((vs) => {
          if (vs === "leaving" || vs === "hidden") {
            return "entering";
          } else {
            return "leaving";
          }
        });
      },
      show() {
        throw new Error("not implemented");
      },
      hide() {
        throw new Error("not implemented");
      },
    });
    const matches = ref<KBarMatches>({
      results: [],
      rootActionId: null,
    });

    provide<Ref<KBarState>>("k-bar-state", state);
    provide<Ref<KBarHandler>>("k-bar-handler", handler);
    provide<Ref<KBarMatches>>("k-bar-matches", matches);
  },
  render() {
    return [h(InternalEvents), this.$slots.default!()];
  },
});
