import { EventEmitter } from 'node:events'

class ReturnedEmitter<Events extends Record<string, unknown>> {
  #eventEmitter = new EventEmitter()

  emit<EventName extends keyof Events>(eventName: EventName extends string ? EventName : never, data: Events[EventName]) {
    return this.#eventEmitter.emit(eventName, data)
  }

  on<EventName extends keyof Events>(eventName: EventName extends string ? EventName : never, listener: (data: Events[EventName]) => void): this {
    this.#eventEmitter.on(eventName, listener)
    return this
  }

  once<EventName extends keyof Events>(eventName: EventName extends string ? EventName : never, listener: (data: Events[EventName]) => void): this {
    this.#eventEmitter.once(eventName, listener)
    return this
  }
}

export const registerEventEmitter = <Events extends Record<string, unknown>>() => {
  return new ReturnedEmitter<Events>()
}
