import { inject, Ref } from "vue";
import { KBarHandler } from "./types";

export function useKBarHandler() {
  const handler = inject<Ref<KBarHandler>>("k-bar-handler")!;

  return handler;
}
