import { Effect, pipe } from 'effect'

import { TransformService } from '../../transform-service'
import type { Handle } from '../handle'

export const handleTemplateTag: Handle<'templateTag', string> = templateTag =>
  Effect.gen(function* (_) {
    const transformService = yield * _(TransformService)

    yield * _(transformService.autoImport(templateTag.tagName.$value))

    const isComponent = yield * _(transformService.isComponent(templateTag.tagName.$value))

    return String.prototype.concat(
      '<',
      isComponent
        ? `${templateTag.tagName.$value} ` // TODO: We may need to perform some operations to get this to work
        : `${templateTag.tagName.$value} `,
      yield * _(
        pipe(
          templateTag.attributes,
          Effect.forEach(
            transformService.handle,
          ),
          Effect.map(attributes => attributes.join(' ')),
        ),
      ),
      templateTag.children === undefined
        ? '/>'
        : String.prototype.concat(
          '>',
          yield * _(
            pipe(
              templateTag.children,
              Effect.forEach(
                transformService.handle,
              ),
              Effect.map(instructions => instructions.join('\n')),
            ),
          ),
          '</',
          templateTag.tagName.$value,
          '>',
        ),
    )
  })
