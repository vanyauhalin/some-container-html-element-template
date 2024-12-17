import {type SomeContainer} from "./element.ts"

export interface SomeContainerChangeEventListener extends EventListener {
  (this: SomeContainer, e: SomeContainerChangeEvent): void
}

export interface GlobalSomeContainerChangeEventHandler {
  (this: GlobalEventHandlers, e: SomeContainerChangeEvent): void
}

export class SomeContainerChangeEvent extends Event {
  static get handlerName(): `on${typeof SomeContainerChangeEvent.type}` {
    return `on${this.type}`
  }

  static get type(): "somecontainerchange" {
    return "somecontainerchange"
  }

  type = SomeContainerChangeEvent.type

  constructor(d?: EventInit) {
    super(SomeContainerChangeEvent.type, d)
  }
}

export interface SomeContainerChangedEventListener extends EventListener {
  (this: SomeContainer, e: SomeContainerChangedEvent): void
}

export interface GlobalSomeContainerChangedEventHandler {
  (this: GlobalEventHandlers, e: SomeContainerChangedEvent): void
}

export class SomeContainerChangedEvent extends Event {
  static get handlerName(): `on${typeof SomeContainerChangedEvent.type}` {
    return `on${this.type}`
  }

  static get type(): "somecontainerchanged" {
    return "somecontainerchanged"
  }

  type = SomeContainerChangedEvent.type

  constructor(d?: EventInit) {
    super(SomeContainerChangedEvent.type, d)
  }
}
