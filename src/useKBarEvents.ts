import { inject, onUnmounted, Ref } from "vue";
import { KBarEvents } from "./types";

export function useKBarEvents() {
  const events = inject<Ref<KBarEvents>>("k-bar-events")!;

  return events;
}

type Register = KBarEvents["on"];

export const useKBarEvent: Register = (event, callback) => {
  const events = useKBarEvents().value;
  const unregister = events.on(event, callback);
  onUnmounted(() => {
    unregister();
  });
  return unregister;
};

export const useKBarEventOnce: Register = (event, callback) => {
  const events = useKBarEvents().value;

  const unregister = events.once(event, callback);

  onUnmounted(() => {
    unregister;
  });
  return events.once(event, callback);
};
