import invariant from "tiny-invariant";
import { Action, ActionId, ActionImpl } from "../types";

export class ActionManager {
  actions: ActionImpl[];
  map: Map<ActionId, ActionImpl>;

  constructor() {
    this.actions = [];
    this.map = new Map();
  }

  add(actions: Action[]) {
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      if (action.parent) {
        invariant(
          !this.map.has(action.parent),
          `Attempted to create action "${action.name}" without registering its parent "${action.parent}" first.`
        );
      }
      this.actions.push(this._createActionImpl(action));
    }
    return [...this.actions];
  }

  remove(actionIds: ActionId[]) {
    for (let i = 0; i < actionIds.length; i++) {
      const id = actionIds[i];
      const action = this.map.get(id);
      if (!action) continue;
      this.remove(action.children.map((child) => child.id));
      if (action.parent) {
        const parent = this.map.get(action.parent)!;
        this._removeChild(parent, action.id);
      }
    }
    return [...this.actions];
  }

  _createActionImpl(action: Action): ActionImpl {
    const impl: ActionImpl = {
      ...action,
      children: [],
    };
    if (action.parent) {
      const parent = this.map.get(action.id)!;
      parent.children.push(impl);
    }
    return impl;
  }

  _removeChild(parent: ActionImpl, childId: ActionId): void {
    const index = parent.children.findIndex((child) => child.id === childId);
    if (index >= 0) {
      this.actions.splice(index, 1);
    }
  }
}
