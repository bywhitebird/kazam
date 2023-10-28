import { EventEmitter } from 'node:events'

class ReturnedEmitter<Events extends Record<string, unknown>> {
  #eventEmitter = new EventEmitter()

  #receivedEvents: { [EventName in keyof Events]?: Events[EventName][] } = {}

  emit<EventName extends keyof Events>(eventName: EventName extends string ? EventName : never, data: Events[EventName]) {
    if (!this.#receivedEvents[eventName])
      this.#receivedEvents[eventName] = []

    this.#receivedEvents[eventName]?.push(data as never)

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

  hasReceived<EventName extends keyof Events>(eventName: EventName extends string ? EventName : never): boolean {
    return eventName in this.#receivedEvents
  }

  getLatestReceived<EventName extends keyof Events>(eventName: EventName extends string ? EventName : never): Events[EventName] | undefined {
    return this.#receivedEvents[eventName]?.at(-1)
  }
}

export const registerEventEmitter = <Events extends Record<string, unknown>>() => {
  return new ReturnedEmitter<Events>()
}
