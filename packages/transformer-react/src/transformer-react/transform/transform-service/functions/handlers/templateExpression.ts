import { Effect } from 'effect'

import { TransformService } from '../../transform-service'
import type { Handle } from '../handle'

export const handleTemplateExpression: Handle<'templateExpression', string> = templateExpression =>
  Effect.gen(function* (_) {
    const transformService = yield * _(TransformService)

    return String.prototype.concat(
      '{',
      yield * _(transformService.transformExpression(templateExpression.expression)),
      '}',
    )
  })
