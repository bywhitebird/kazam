import { Effect } from 'effect'

import { TransformService } from '../../transform-service'
import type { Handle } from '../handle'

export const handleComputedInstruction: Handle<'computedInstruction', string> = computedInstruction =>
  Effect.gen(function* (_) {
    const transformService = yield * _(TransformService)

    return String.prototype.concat(
      'const ',
      computedInstruction.name.$value,
      computedInstruction.type !== undefined ? `: ${computedInstruction.type.$value}` : '',
      ' = ',
      yield * _(transformService.transformExpression(computedInstruction.computeValue.expression)),
    )
  })
