import { Effect } from 'effect'

import { upperFirst } from '../../../../utils/upperFirst'
import { TransformService } from '../../transform-service'
import type { Handle } from '../handle'

export const handleStateInstruction: Handle<'stateInstruction', string> = stateInstruction =>
  Effect.gen(function* (_) {
    const transformService = yield * _(TransformService)

    yield * _(transformService.addImport(
      'namedImport',
      { name: 'useState', path: 'https://esm.sh/preact/hooks' },
    ))

    return String.prototype.concat(
      'const [',
      stateInstruction.name.$value,
      ', set',
      upperFirst(stateInstruction.name.$value),
      '] = useState',
      '(',
      stateInstruction.defaultValue !== undefined
        ? stateInstruction.defaultValue.expression.$value
        : '',
      ')',
    )
  })
