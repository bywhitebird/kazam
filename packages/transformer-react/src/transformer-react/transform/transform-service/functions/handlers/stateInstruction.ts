import { Effect } from 'effect'
import { upperFirst } from 'lodash'

import { TransformService } from '../../transform-service'
import type { Handle } from '../handle'

export const handleStateInstruction: Handle<'stateInstruction', string> = stateInstruction =>
  Effect.gen(function* (_) {
    const transformService = yield * _(TransformService)

    yield * _(transformService.addImport(
      'namedImport',
      { name: 'useState', path: 'react' },
    ))

    return String.prototype.concat(
      'const [',
      stateInstruction.name.$value,
      ', set',
      upperFirst(stateInstruction.name.$value),
      '] = useState',
      stateInstruction.type?.$value
        ? `<${stateInstruction.type.$value}>`
        : '',
      '(',
      stateInstruction.defaultValue !== undefined
        ? yield * _(transformService.transformExpression(stateInstruction.defaultValue.expression))
        : '',
      ')',
    )
  })
