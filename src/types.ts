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
type ActionImpl = Action & {
  children: ActionImpl[];
};

export type ActionTree = ActionImpl[];

// need to store and sync exact animation state
// because we need to manipulate the `document.body.style`
// to lock/unlock the page scrolling
// before animation starts and after animation ends
export type VisualState = "entering" | "visible" | "leaving" | "hidden";

export interface KBarState {
  search: string;
  actions: ActionTree;
  currentRootActionId: ActionId | null; // used when dived into action groups
  activeIndex: number;
  visibility: VisualState;
}

export type VisualStateUpdateCallback = (vs: VisualState) => VisualState;

export interface KBarHandler {
  setSearch: (search: string) => void;
  registerActions: (actions: Action[]) => () => void; // returns a function to unregister
  setCurrentRootAction: (actionId: ActionId | null) => void;
  setVisibility: (cb: VisualStateUpdateCallback | VisualState) => void; // set visibility programmatically
  toggle: () => void;
  show: () => void;
  hide: () => void;
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
  results: (string | Action)[]; // string for section title
  rootActionId: string | null;
}

export interface KBarOptions {}
