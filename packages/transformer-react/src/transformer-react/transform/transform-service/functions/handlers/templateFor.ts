import { Effect, pipe } from 'effect'

import { TransformService } from '../../transform-service'
import type { Handle } from '../handle'

export const handleTemplateFor: Handle<'templateFor', string> = templateFor =>
  Effect.gen(function* (_) {
    const transformService = yield * _(TransformService)

    yield * _(transformService.addImport(
      'namedImport',
      { name: 'Fragment', path: 'react' },
    ))

    return String.prototype.concat(
      '{Array.from((function* () {',
      'let key = 0;',
      'for (',
      templateFor.parameters.$value,
      ') {',
      'yield <Fragment key={key++}>',
      yield * _(
        pipe(
          templateFor.children,
          Effect.forEach(
            transformService.handle,
          ),
          Effect.map(template => template.join('\n')),
        ),
      ),
      '</Fragment>',
      '}',
      '})())}',
    )
  })
