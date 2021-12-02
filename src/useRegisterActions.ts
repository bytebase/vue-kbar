import { MaybeRef } from "@vueuse/shared";
import { onUnmounted, ref, shallowRef, watchEffect } from "vue";
import { Action } from "./types";
import { useKBarHandler } from "./useKBarHandler";

export function useRegisterActions(
  actions: MaybeRef<Action[]>,
  prepend = false
): () => void {
  const source = shallowRef(actions);
  const unregister = ref<() => void>();
  const handler = useKBarHandler();
  watchEffect(() => {
    unregister.value?.();

    unregister.value = handler.value.registerActions(source.value, prepend);
  });

  onUnmounted(() => {
    unregister.value?.();
  });

  return unregister.value || noop;
}

function noop() {
  // noop
}
