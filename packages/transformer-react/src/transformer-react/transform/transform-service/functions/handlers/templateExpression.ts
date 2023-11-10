import { Effect } from 'effect'

import type { Handle } from '../handle'

export const handleTemplateExpression: Handle<'templateExpression', string> = templateExpression =>
  Effect.gen(function* () {
    return String.prototype.concat(
      '{',
      templateExpression.expression.$value,
      '}',
    )
  })
