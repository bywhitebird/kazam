import { Effect } from 'effect'

import { TransformService } from '../../transform-service'
import type { Handle } from '../handle'

export const handlePropInstruction: Handle<'propInstruction', {
  declaration: string
  type: string
}> = propInstruction =>
  Effect.gen(function* (_) {
    const transformService = yield * _(TransformService)

    return {
      declaration: String.prototype.concat(
        propInstruction.name.$value,
        propInstruction.defaultValue !== undefined
          ? ` = ${yield * _(transformService.transformExpression(propInstruction.defaultValue.expression))}`
          : '',
      ),
      type: String.prototype.concat(
        propInstruction.name.$value,
        ': ',
        propInstruction.type?.$value ?? 'any',
      ),
    }
  })
