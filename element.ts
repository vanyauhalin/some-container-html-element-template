import {
  SomeContainerChangedEvent,
  type SomeContainerChangedEventListener,
  SomeContainerChangeEvent,
  type SomeContainerChangeEventListener,
} from "./events.ts"
import {
  type SomeContainerAttributeName,
  type SomeContainerPropertyName,
  type SomeContainerEventListenerName,
} from "./types.ts"
import {
  isEnterKey,
  isKeydownEvent,
  isWithin,
  queryElement,
  resolveEventListener,
} from "./utils.ts"

export class SomeContainer extends HTMLElement {
  static get tagName(): "some-container" {
    return "some-container"
  }

  //
  // Attributes
  //

  static get observedAttributes(): SomeContainerAttributeName[] {
    return [
      ...this.observedProperties,
      ...this.observedEventListeners,
    ]
  }

  static get observedProperties(): SomeContainerPropertyName[] {
    return [
      "property",
    ]
  }

  static get observedEventListeners(): SomeContainerEventListenerName[] {
    return [
      SomeContainerChangedEvent.handlerName,
      SomeContainerChangeEvent.handlerName,
    ]
  }

  attributeChangedCallback(n: SomeContainerAttributeName, _: string, v: string | null): void {
    if (n === "property") {
      this[n] = v
      return
    }

    if (n === SomeContainerChangeEvent.handlerName) {
      this[n] = resolveEventListener(v)
      return
    }
  }

  //
  // Properties
  //

  #property: string

  get property(): string {
    return this.#property
  }

  set property(s: string | null) {
    if (s === null) {
      s = this.#defaultProperty
    }
    this.#property = s
  }

  #defaultProperty = ""

  get defaultProperty(): string {
    return this.#defaultProperty
  }

  //
  // Event Listeners
  //

  #onsomecontainerchange: SomeContainerChangeEventListener | null = null

  get onsomecontainerchange(): SomeContainerChangeEventListener | null {
    return this.#onsomecontainerchange
  }

  set onsomecontainerchange(l: SomeContainerChangeEventListener | null) {
    if (this.#onsomecontainerchange) {
      this.removeEventListener(SomeContainerChangeEvent.type, this.#onsomecontainerchange)
    }
    this.#onsomecontainerchange = l
    if (this.#onsomecontainerchange) {
      this.addEventListener(SomeContainerChangeEvent.type, this.#onsomecontainerchange)
    }
  }

  #onsomecontainerchanged: SomeContainerChangedEventListener | null = null

  get onsomecontainerchanged(): SomeContainerChangedEventListener | null {
    return this.#onsomecontainerchanged
  }

  set onsomecontainerchanged(l: SomeContainerChangedEventListener | null) {
    if (this.#onsomecontainerchanged) {
      this.removeEventListener(SomeContainerChangedEvent.type, this.#onsomecontainerchanged)
    }
    this.#onsomecontainerchanged = l
    if (this.#onsomecontainerchanged) {
      this.addEventListener(SomeContainerChangedEvent.type, this.#onsomecontainerchanged)
    }
  }

  //
  // Elements
  //

  get element(): HTMLElement | null {
    let e = queryElement(this)
    if (!e || !isWithin(this, e)) {
      return null
    }
    return e
  }

  //
  // Lifecycle
  //

  #internals?: ElementInternals

  constructor() {
    super()
    this.#property = this.#defaultProperty
  }

  connectedCallback(): void {
    this.#attach()
    this.#setup()
    this.#listen()
  }

  disconnectedCallback(): void {
    this.#delisten()
  }

  #attach(): void {
    if (this.attachInternals) {
      this.#internals = this.attachInternals()
    }
  }

  #setup(): void {
    this.#setupElement()
  }

  #setupElement(): void {
    let e = this.element
    if (!e) {
      return
    }
  }

  #listen(): void {
    this.addEventListener("click", this)
  }

  #delisten(): void {
    this.removeEventListener("click", this)
  }

  handleEvent(e: Event): void {
    if (
      isKeydownEvent(e) &&
      isEnterKey(e.key) &&
      e.target !== null &&
      e.target === this.element
    ) {
      e.preventDefault()
      return
    }
  }
}
