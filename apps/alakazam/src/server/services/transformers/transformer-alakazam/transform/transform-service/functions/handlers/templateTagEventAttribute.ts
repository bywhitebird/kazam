import { Effect } from 'effect'

import { upperFirst } from '../../../../utils/upperFirst'
import type { Handle } from '../handle'

export const handleTemplateTagEventAttribute: Handle<'templateTagEventAttribute', string> = templateTagEventAttribute =>
  Effect.gen(function* () {
    return String.prototype.concat(
      'on',
      upperFirst(templateTagEventAttribute.name.$value),
      '=',
      '\${',
      templateTagEventAttribute.expression.$value,
      '}',
    )
  })
