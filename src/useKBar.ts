import { useKBarHandler } from "./useKBarHandler";
import { useKBarMatches } from "./useKBarMatches";
import { useKBarState } from "./useKBarState";

export function useKBar() {
  const state = useKBarState();
  const handler = useKBarHandler();
  const matches = useKBarMatches();

  return { state, handler, matches };
}
