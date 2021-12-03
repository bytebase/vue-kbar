import { Action } from "../types";

function randomId() {
  return Math.random().toString(36).substring(2, 9);
}

export function defineAction<T>(params: Partial<Action<T>>): Action<T> {
  if (!params.id) params.id = randomId();

  return params as Action<T>;
}
