import { Effect, pipe } from 'effect'

import { TransformService } from '../../transform-service'
import type { Handle } from '../handle'

export const handleTemplateIf: Handle<'templateIf', string> = templateIf =>
  Effect.gen(function* (_) {
    const transformService = yield * _(TransformService)

    return String.prototype.concat(
      '{',
      templateIf.condition.$value,
      ' ? <>',
      yield * _(
        pipe(
          templateIf.children,
          Effect.forEach(
            transformService.handle,
          ),
          Effect.map(template => template.join('\n')),
        ),
      ),
      '</>',
      templateIf.else !== undefined
        ? 'if' in templateIf.else
          ? ` : ${yield * _(transformService.handle(templateIf.else))}`
          : ` : <>${yield * _(transformService.handle(templateIf.else))}</>`
        : '',
      '}',
    )
  })
