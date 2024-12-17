import {
  SomeContainer,
} from "./element.ts"
import {
  type GlobalSomeContainerChangedEventHandler,
  type GlobalSomeContainerChangeEventHandler,
  SomeContainerChangedEvent,
  SomeContainerChangeEvent,
} from "./events.ts"
import {
  type SomeContainerAttributeMap,
} from "./types.ts"

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
