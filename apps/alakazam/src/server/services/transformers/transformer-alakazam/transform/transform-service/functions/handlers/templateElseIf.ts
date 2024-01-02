import { Effect, pipe } from 'effect'

import { TransformService } from '../../transform-service'
import type { Handle } from '../handle'

export const handleTemplateElseIf: Handle<'templateElseIf', string> = templateElseIf =>
  Effect.gen(function* (_) {
    const transformService = yield * _(TransformService)

    transformService.handle({ ...templateElseIf.if, $type: 'IfLogical' })

    return yield * _(
      pipe(
        { ...templateElseIf.if, $type: 'IfLogical' as const },
        transformService.handle,
        Effect.map(instruction => instruction.slice(1, -1)),
      ),
    )
  })
