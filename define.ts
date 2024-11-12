import {
  type GlobalSomeContainerChangedEventHandler,
  type GlobalSomeContainerChangeEventHandler,
  SomeContainer,
  type SomeContainerAttributeMap,
  SomeContainerChangedEvent,
  SomeContainerChangeEvent,
} from "./element.ts"

declare global {
  interface Window {
    SomeContainer: typeof SomeContainer
    SomeContainerChangeEvent: typeof SomeContainerChangeEvent
    SomeContainerChangedEvent: typeof SomeContainerChangedEvent
  }

  interface HTMLElementTagNameMap {
    "some-container": SomeContainer
  }

  namespace preact {
    namespace JSX {
      interface IntrinsicElements {
        "some-container": HTMLAttributes<SomeContainer> & Partial<SomeContainerAttributeMap>
      }
    }
  }

  interface GlobalEventHandlersEventMap {
    somecontainerchange: SomeContainerChangeEvent
    somecontainerchanged: SomeContainerChangedEvent
  }

  interface GlobalEventHandlers {
    onsomecontainerchange: GlobalSomeContainerChangeEventHandler | null
    onsomecontainerchanged: GlobalSomeContainerChangedEventHandler | null
  }
}

export function define(w: Window): void {
  if (w.customElements.get(SomeContainer.tagName)) {
    return
  }

  w.SomeContainer = SomeContainer
  w.customElements.define(SomeContainer.tagName, SomeContainer)

  w.SomeContainerChangeEvent = SomeContainerChangeEvent
  w.SomeContainerChangedEvent = SomeContainerChangedEvent
}
