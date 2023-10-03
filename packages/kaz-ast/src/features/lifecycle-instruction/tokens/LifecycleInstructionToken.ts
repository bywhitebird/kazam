import { LifecycleInstructionContext } from '..'
import { Token } from '../../../lib/voltair'
import { InstructionContext } from '../../instruction'

export const LifecycleInstructionToken = new Token({
  $name: 'LifecycleInstructionToken',
  validator: /^on((?:Mount))$/,
  startContexts: [() => LifecycleInstructionContext],
  inContexts: [() => InstructionContext],
  getValue(rawValue) {
    return rawValue.slice(2).toLowerCase()
  },
  semantic: {
    type: 'keyword',
  },
})
