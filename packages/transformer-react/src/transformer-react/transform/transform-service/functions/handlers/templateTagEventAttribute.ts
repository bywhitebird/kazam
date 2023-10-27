import { Effect } from 'effect'
import { upperFirst } from 'lodash'

import { TransformService } from '../../transform-service'
import type { Handle } from '../handle'

export const handleTemplateTagEventAttribute: Handle<'templateTagEventAttribute', string> = templateTagEventAttribute =>
  Effect.gen(function* (_) {
    const transformService = yield * _(TransformService)

    return String.prototype.concat(
      'on',
      upperFirst(templateTagEventAttribute.name.$value),
      '=',
      '{',
      yield * _(transformService.transformExpression(templateTagEventAttribute.expression)),
      '}',
    )
  })
