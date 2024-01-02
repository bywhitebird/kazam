import { Effect } from 'effect'

import type { Handle } from '../handle'

export const handleComputedInstruction: Handle<'computedInstruction', string> = computedInstruction =>
  Effect.gen(function* () {
    return String.prototype.concat(
      'const ',
      computedInstruction.name.$value,
      computedInstruction.type !== undefined ? `: ${computedInstruction.type.$value}` : '',
      ' = ',
      computedInstruction.computeValue.expression.$value,
    )
  })
