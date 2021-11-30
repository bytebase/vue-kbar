import { inject, Ref } from "vue";
import { KBarMatches } from "./types";

export function useKBarMatches() {
  const matches = inject<Ref<KBarMatches>>("k-bar-matches")!;

  return matches;
}
