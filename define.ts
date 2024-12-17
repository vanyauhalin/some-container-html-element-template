import {
  SomeContainer,
} from "./element.ts"
import {
  SomeContainerChangedEvent,
  SomeContainerChangeEvent,
} from "./events.ts"

export function define(w: Window): void {
  if (w.customElements.get(SomeContainer.tagName)) {
    return
  }

  w.SomeContainer = SomeContainer
  w.customElements.define(SomeContainer.tagName, SomeContainer)

  w.SomeContainerChangeEvent = SomeContainerChangeEvent
  w.SomeContainerChangedEvent = SomeContainerChangedEvent
}
