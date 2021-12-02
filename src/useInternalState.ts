import { ref } from "vue";
import { ActionImpl, KBarOptions } from ".";
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

export function useInternalState(options: KBarOptions, actions: Action[]) {
  const state = ref<KBarState>({
    options,
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
  const setCurrentRootAction = (
    actionId: ActionId | null | undefined
  ): void => {
    state.value.currentRootActionId = actionId;
    state.value.search = "";
  };
  const registerActions = (
    actions: Action[],
    prepend = false
  ): (() => void) => {
    state.value.actions = actionManager.add(actions, prepend);
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
  const show = () => {
    setVisibility((vs) =>
      vs === "leaving" || vs === "hidden" ? "entering" : vs
    );
  };
  const hide = () => {
    setVisibility((vs) =>
      vs === "entering" || vs === "visible" ? "leaving" : vs
    );
  };
  const performAction = (action: ActionImpl) => {
    if (action.perform) {
      action.perform(action);
      handler.value.hide();
    } else {
      handler.value.setCurrentRootAction(action.id);
      handler.value.setSearch("");
    }
  };

  const handler = ref<KBarHandler>({
    setSearch,
    setCurrentRootAction,
    registerActions,
    setVisibility,
    setActiveIndex,
    toggle,
    show,
    hide,
    performAction,
  });
  const matches = useInternalMatches(state);

  registerActions(actions);

  return {
    state,
    handler,
    matches,
  };
}
