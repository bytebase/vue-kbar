import { Action } from "../types";

function randomId() {
  return Math.random().toString(36).substring(2, 9);
}

export function createAction<T>(params: Omit<Action<T>, "id">) {
  return {
    id: randomId(),
    ...params,
  } as Action;
}
