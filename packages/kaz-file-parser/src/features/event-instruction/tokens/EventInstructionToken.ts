import { EventInstructionContext } from '..'
import { Token } from '../../../lib/voltair'
import { InstructionContext } from '../../instruction'

const onRegex = /^on:([a-zA-Z_$][a-zA-Z_$0-9]+)$/

export const EventInstructionToken = new Token({
  $name: 'EventInstructionToken',
  validator: onRegex,
  getValue: (rawValue) => {
    const [, eventName] = rawValue.match(onRegex) || []

    if (!eventName)
      throw new Error('Event name is required')

    return eventName
  },
  startContexts: [() => EventInstructionContext],
  inContexts: [() => InstructionContext],
})
