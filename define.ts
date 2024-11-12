import {
  type GlobalSomeContainerChangedEventHandler,
  type GlobalSomeContainerChangeEventHandler,
  SomeContainer,
  type SomeContainerAttributeMap,
  SomeContainerChangedEvent,
  SomeContainerChangeEvent,
} from "./element.ts"

declare global {
  namespace preact {
    namespace JSX {
      interface IntrinsicElements {
        [SomeContainer.tagName]: HTMLAttributes<SomeContainer> & Partial<SomeContainerAttributeMap>
      }
    }
  }

  namespace react {
    namespace JSX {
      interface IntrinsicElements {
        [SomeContainer.tagName]: React.DetailedHTMLProps<React.HTMLAttributes<SomeContainer>, SomeContainer> & Partial<SomeContainerAttributeMap>
      }
    }
  }

  interface Window {
    SomeContainer: typeof SomeContainer
    SomeContainerChangeEvent: typeof SomeContainerChangeEvent
    SomeContainerChangedEvent: typeof SomeContainerChangedEvent
  }

  interface HTMLElementTagNameMap {
    [SomeContainer.tagName]: SomeContainer
  }

  interface GlobalEventHandlersEventMap {
    [SomeContainerChangeEvent.type]: SomeContainerChangeEvent
    [SomeContainerChangedEvent.type]: SomeContainerChangedEvent
  }

  interface GlobalEventHandlers {
    [SomeContainerChangeEvent.handlerName]: GlobalSomeContainerChangeEventHandler | null
    [SomeContainerChangedEvent.handlerName]: GlobalSomeContainerChangedEventHandler | null
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
