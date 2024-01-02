import { Effect } from 'effect'

import { TransformService } from '../../transform-service'
import type { Handle } from '../handle'

export const handleWatchInstruction: Handle<'watchInstruction', string> = watchInstruction =>
  Effect.gen(function* (_) {
    const transformService = yield * _(TransformService)

    yield * _(transformService.addImport(
      'namedImport',
      { name: 'useEffect', path: 'https://esm.sh/preact/hooks' },
    ))

    return String.prototype.concat(
      'useEffect(() => {',
      watchInstruction.callbackExpression.$value,
      '}, [',
      watchInstruction.watchedVariables.map(variable => variable.name.$value).join(', '),
      '])',
    )
  })
