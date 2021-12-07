import KBarProvider from "./KBarProvider";
import KBarPortal from "./KBarPortal.vue";
import KBarPositioner from "./KBarPositioner.vue";
import KBarAnimator from "./KBarAnimator.vue";
import KBarSearch from "./KBarSearch.vue";
import KBarResults from "./KBarResults.vue";
import { useKBarState } from "./useKBarState";
import { useKBarHandler } from "./useKBarHandler";
import { useKBarMatches } from "./useKBarMatches";
import { useKBar } from "./useKBar";
import { useRegisterActions } from "./useRegisterActions";
import { defineAction } from "./action";

const createAction = defineAction; // for legacy compatibility

export * from "./types";
export {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useKBarState,
  useKBarHandler,
  useKBarMatches,
  useKBar,
  useRegisterActions,
  defineAction,
  createAction,
};
