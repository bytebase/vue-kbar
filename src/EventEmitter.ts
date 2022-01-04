export type EventCallback<D> = (data: D) => void;

export type EventsMap = Record<string, any>;

export type UnsubscribeFn = () => void;

type DatalessEventNames<Events extends EventsMap> = {
  [Key in keyof Events]: Events[Key] extends undefined ? Key : never;
}[keyof Events];

type DatafullEventNames<Events extends EventsMap> = {
  [Key in keyof Events]: Events[Key] extends undefined ? never : Key;
}[keyof Events];

export class EventEmitter<Events extends EventsMap> {
  listeners: {
    [E in keyof Events]: EventCallback<Events[E]>[];
  };

  constructor() {
    this.listeners = {} as any;
  }

  on<E extends keyof Events>(
    event: E,
    callback: EventCallback<Events[E]>
  ): UnsubscribeFn {
    const array = this.listeners[event] || (this.listeners[event] = []);
    array.push(callback);
    return () => this.off(event, callback);
  }

  off<E extends keyof Events>(
    event: E,
    callback: EventCallback<Events[E]>
  ): void {
    const array = this.listeners[event];
    if (!array || array.length === 0) return;
    const index = array.indexOf(callback);
    if (index < 0) return;
    array.splice(index, 1);
  }

  once<E extends keyof Events>(
    event: E,
    callback: EventCallback<Events[E]>
  ): UnsubscribeFn {
    const cb = (data: Events[E]) => {
      this.off(event, cb);
      callback(data);
    };

    return this.on(event, cb);
  }

  emit<E extends DatalessEventNames<Events>>(event: E): void;
  emit<E extends DatafullEventNames<Events>>(event: E, data: Events[E]): void;
  emit<E extends keyof Events>(event: E, data?: Events[E]): void {
    const array = this.listeners[event];
    if (!array || array.length === 0) return;
    for (let i = 0; i < array.length; i++) {
      const cb = array[i];
      cb(data!);
    }
  }
}
