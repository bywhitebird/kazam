import { Effect } from 'effect'

import type { Handle } from '../handle'

export const handlePropInstruction: Handle<'propInstruction', {
  declaration: string
  type: string
}> = propInstruction =>
  Effect.gen(function* () {
    return {
      declaration: String.prototype.concat(
        propInstruction.name.$value,
        propInstruction.defaultValue !== undefined
          ? ` = ${propInstruction.defaultValue.expression.$value}`
          : '',
      ),
      type: String.prototype.concat(
        propInstruction.name.$value,
        ': ',
        propInstruction.type?.$value ?? 'any',
      ),
    }
  })
