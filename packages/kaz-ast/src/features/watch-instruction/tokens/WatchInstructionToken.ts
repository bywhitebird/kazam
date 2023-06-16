import { WatchInstructionContext } from '..'
import { Token } from '../../../lib/voltair'
import { InstructionContext } from '../../instruction'

export const WatchInstructionToken = new Token({
  $name: 'WatchInstructionToken',
  validator: /^watch$/,
  startContexts: [() => WatchInstructionContext],
  inContexts: [() => InstructionContext],
  semantic: {
    type: 'keyword',
  },
})
