import {
  type GlobalSomeContainerChangedEventHandler,
  type GlobalSomeContainerChangeEventHandler,
  type SomeContainerChangedEvent,
  type SomeContainerChangedEventListener,
  type SomeContainerChangeEvent,
  type SomeContainerChangeEventListener,
} from "./events.ts"

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
  property: "value"
}

export type SomeContainerEventListener =
  SomeContainerEventListenerMap[SomeContainerEventListenerName]

export type SomeContainerEventListenerName =
  keyof SomeContainerEventListenerMap

export interface SomeContainerEventListenerMap {
  [SomeContainerChangeEvent.handlerName]: SomeContainerChangeEventListener
  [SomeContainerChangedEvent.handlerName]: SomeContainerChangedEventListener
}

export type GlobalSomeContainerEventHandler =
  GlobalSomeContainerEventHandlerMap[GlobalSomeContainerEventHandlerName]

export type GlobalSomeContainerEventHandlerName =
  keyof GlobalSomeContainerEventHandlerMap

export interface GlobalSomeContainerEventHandlerMap {
  [SomeContainerChangeEvent.handlerName]: GlobalSomeContainerChangeEventHandler
  [SomeContainerChangedEvent.handlerName]: GlobalSomeContainerChangedEventHandler
}

export type SomeContainerEvent =
  SomeContainerEventMap[SomeContainerEventType]

export type SomeContainerEventType =
  keyof SomeContainerEventMap

export interface SomeContainerEventMap {
  [SomeContainerChangeEvent.type]: SomeContainerChangeEvent
  [SomeContainerChangedEvent.type]: SomeContainerChangedEvent
}
