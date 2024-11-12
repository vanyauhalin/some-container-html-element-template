export class SomeContainer extends HTMLElement {
  static get tagName(): "some-container" {
    return "some-container"
  }

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
      "onsomecontainerchange",
      "onsomecontainerchanged",
    ]
  }

  attributeChangedCallback(n: SomeContainerAttributeName, _: string, v: string | null): void {
    if (n === "property") {
      this[n] = v
      return
    }

    if (n === "onsomecontainerchange") {
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

//
// Types
//

export type SomeContainerAttribute =
  SomeContainerAttributeMap[SomeContainerAttributeName]

export type SomeContainerAttributeName =
  keyof SomeContainerAttributeMap

export type SomeContainerAttributeMap = {
  [K in SomeContainerPropertyName]: string
} & {
  [K in SomeContainerEventListenerName]: string
}

export type SomeContainerProperty =
  SomeContainerPropertyMap[SomeContainerPropertyName]

export type SomeContainerPropertyName =
  keyof SomeContainerPropertyMap

export interface SomeContainerPropertyMap {
  "property": "value"
}

export type SomeContainerEventListener =
  SomeContainerEventListenerMap[SomeContainerEventListenerName]

export type SomeContainerEventListenerName =
  keyof SomeContainerEventListenerMap

export interface SomeContainerEventListenerMap {
  "onsomecontainerchange": SomeContainerChangeEventListener
  "onsomecontainerchanged": SomeContainerChangedEventListener
}

export type SomeContainerEvent =
  SomeContainerEventMap[SomeContainerEventType]

export type SomeContainerEventType =
  keyof SomeContainerEventMap

export interface SomeContainerEventMap {
  "somecontainerchange": SomeContainerChangeEvent
  "somecontainerchanged": SomeContainerChangedEvent
}

export type GlobalSomeContainerEventHandler =
  GlobalSomeContainerEventHandlerMap[GlobalSomeContainerEventHandlerName]

export type GlobalSomeContainerEventHandlerName =
  keyof GlobalSomeContainerEventHandlerMap

export interface GlobalSomeContainerEventHandlerMap {
  "onsomecontainerchange": GlobalSomeContainerChangeEventHandler
  "onsomecontainerchanged": GlobalSomeContainerChangedEventHandler
}

//
// Events
//

export class SomeContainerChangeEvent extends Event {
  static get type(): "somecontainerchange" {
    return "somecontainerchange"
  }

  type = SomeContainerChangeEvent.type

  constructor(d: EventInit) {
    super(SomeContainerChangeEvent.type, d)
  }
}

export interface SomeContainerChangeEventListener extends EventListener {
  (this: SomeContainer, e: SomeContainerChangeEvent): void
}

export interface GlobalSomeContainerChangeEventHandler {
  (this: GlobalEventHandlers, e: SomeContainerChangeEvent): void
}

export class SomeContainerChangedEvent extends Event {
  static get type(): "somecontainerchanged" {
    return "somecontainerchanged"
  }

  type = SomeContainerChangedEvent.type

  constructor(d: EventInit) {
    super(SomeContainerChangedEvent.type, d)
  }
}

export interface SomeContainerChangedEventListener extends EventListener {
  (this: SomeContainer, e: SomeContainerChangedEvent): void
}

export interface GlobalSomeContainerChangedEventHandler {
  (this: GlobalEventHandlers, e: SomeContainerChangedEvent): void
}

//
// Utilities
//

function resolveEventListener<L>(v: string | null): L | null {
  if (v === null) {
    return null
  }
  return new Function("event", v) as L
}

function queryElement(n: ParentNode): HTMLElement | null {
  return n.querySelector("")
}

function isWithin(c: SomeContainer, e: Element): boolean {
  return e.closest(c.tagName) === c
}

function isEnterKey(k: unknown): k is "Enter" {
  return typeof k === "string" && k === "Enter"
}

function isKeydownEvent(e: unknown): e is KeyboardEvent {
  return e instanceof Event && e.type === "keydown"
}
