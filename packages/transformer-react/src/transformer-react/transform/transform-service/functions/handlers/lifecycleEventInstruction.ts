import { Effect } from 'effect'

import { TransformService } from '../../transform-service'
import type { Handle } from '../handle'

export const handleLifecycleEventInstruction: Handle<'lifecycleEventInstruction', string> = lifecycleEventInstruction =>
  Effect.gen(function* (_) {
    const transformService = yield * _(TransformService)

    yield * _(transformService.addImport('namedImport', { name: 'useEffect', path: 'react' }))

    const { event, callbackExpression } = lifecycleEventInstruction

    switch (event.$value) {
      case 'mount': {
        return String.prototype.concat(
          'useEffect(() => {',
          yield * _(transformService.transformExpression(callbackExpression)),
          '}, [])',
        )
      }
    }
  })
