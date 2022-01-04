import { Ref } from "vue";

export type MaybeRef<T> = T | Ref<T>;

export type ActionId = string;

export interface Action<T = any> {
  id: ActionId;
  shortcut?: string[]; // optional global shortcut. e.g.['g', 'h'] go to '/home'
  keywords?: string; // keywords separated by whitespace
  name: string;
  subtitle?: string;
  section?: string;
  data?: T; // can be used for custom rendering and performing.
  perform?: (currentAction: Action) => any | Promise<any>;
  parent?: ActionId;
}

// internal type of Action
// to organize actions as a tree
export type ActionImpl = Action & {
  children: ActionImpl[];
};

export type ActionTree = ActionImpl[];

// need to store and sync exact animation state
// because we need to manipulate the `document.body.style`
// to lock/unlock the page scrolling
// before animation starts and after animation ends
export type VisualState = "entering" | "visible" | "leaving" | "hidden";

export interface KBarState {
  options: KBarOptions;
  search: string;
  actions: ActionTree;
  currentRootActionId: ActionId | null | undefined; // used when dived into action groups
  activeIndex: number;
  visibility: VisualState;
}

export type UpdateCallback<T> = (curr: T) => T;

export interface KBarHandler {
  setOptions: (options: KBarOptions) => void;
  setSearch: (search: string) => void;
  registerActions: (actions: Action[], prepend?: boolean) => () => void; // returns a function to unregister
  setCurrentRootAction: (actionId: ActionId | null | undefined) => void;
  setActiveIndex: (cb: UpdateCallback<number> | number) => void;
  setVisibility: (cb: UpdateCallback<VisualState> | VisualState) => void; // set visibility programmatically
  toggle: () => void;
  show: () => void;
  hide: () => void;
  performAction: (action: ActionImpl) => void;
}

// match results are not part of KBarState
// because we think matching is a high cost operation
// (especially when we have many actions)
// so, performing of matching will be throttled internally
// calling `useMatches` (see below) will actually not perform a match
// real matches will be performed when
//   1. input query changed
//   2. actions changed
//   3. rootActionId changed
export interface KBarMatches {
  results: (string | ActionImpl)[]; // string for section title
  rootActionId: string | null | undefined;
}

export type IndexedItem<T> = {
  index: number;
  item: T;
};

export type CompareFn = (
  a: IndexedItem<ActionImpl>,
  b: IndexedItem<ActionImpl>
) => number;

export interface KBarOptions {
  placeholder?: string;
  disabled?: boolean;
  compare?: CompareFn;
}
