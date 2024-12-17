import {type SomeContainer} from "./element.ts"

export function resolveEventListener<L>(v: string | null): L | null {
  if (v === null) {
    return null
  }
  return new Function("event", v) as L
}

export function queryElement(n: ParentNode): HTMLElement | null {
  return n.querySelector("")
}

export function isWithin(c: SomeContainer, e: Element): boolean {
  return e.closest(c.tagName) === c
}

export function isEnterKey(k: unknown): k is "Enter" {
  return typeof k === "string" && k === "Enter"
}

export function isKeydownEvent(e: unknown): e is KeyboardEvent {
  return e instanceof Event && e.type === "keydown"
}
