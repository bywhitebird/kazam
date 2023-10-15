import { Effect, pipe } from 'effect'

import { TransformService } from '../../transform-service'
import type { Handle } from '../handle'

export const handleTemplateElse: Handle<'templateElse', string> = templateElse =>
  Effect.gen(function* (_) {
    const transformService = yield * _(TransformService)

    return yield * _(
      pipe(
        templateElse.children,
        Effect.forEach(
          transformService.handle,
        ),
        Effect.map(instructions => instructions.join('\n')),
      ),
    )
  })
