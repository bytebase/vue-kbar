import { ref } from "vue";
import { ActionManager } from "./action";
import {
  Action,
  ActionId,
  KBarHandler,
  KBarState,
  VisualState,
  UpdateCallback,
} from "./types";
import { useInternalMatches } from "./useInternalMatches";

export function useInternalState(options: any, actions: Action[]) {
  const state = ref<KBarState>({
    search: "",
    actions: [],
    currentRootActionId: null,
    activeIndex: 0,
    visibility: "hidden",
  });
  const actionManager = new ActionManager();

  const setSearch = (search: string): void => {
    state.value.search = search;
  };
  const setCurrentRootAction = (actionId: ActionId | null): void => {
    state.value.currentRootActionId = actionId;
  };
  const registerActions = (actions: Action[]): (() => void) => {
    state.value.actions = actionManager.add(actions);
    const unregister = () => {
      state.value.actions = actionManager.remove(actions.map((act) => act.id));
    };
    return unregister;
  };
  const setActiveIndex = (cb: UpdateCallback<number> | number) => {
    if (typeof cb === "function") {
      state.value.activeIndex = cb(state.value.activeIndex);
    } else {
      state.value.activeIndex = cb;
    }
  };
  const setVisibility = (cb: UpdateCallback<VisualState> | VisualState) => {
    if (typeof cb === "function") {
      state.value.visibility = cb(state.value.visibility);
    } else {
      state.value.visibility = cb;
    }
  };
  const toggle = () => {
    setVisibility((vs) => {
      if (vs === "leaving" || vs === "hidden") {
        return "entering";
      } else {
        return "leaving";
      }
    });
  };
  const show = () => setVisibility("entering");
  const hide = () => setVisibility("leaving");

  const handler = ref<KBarHandler>({
    setSearch,
    setCurrentRootAction,
    registerActions,
    setVisibility,
    setActiveIndex,
    toggle,
    show,
    hide,
  });
  const matches = useInternalMatches(state);

  registerActions(actions);

  return {
    state,
    handler,
    matches,
  };
}
