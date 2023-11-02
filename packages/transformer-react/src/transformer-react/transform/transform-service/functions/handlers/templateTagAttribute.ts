import { Effect, pipe } from 'effect'

import { TransformService } from '../../transform-service'
import type { Handle } from '../handle'

export const handleTemplateTagAttribute: Handle<'templateTagAttribute', string> = templateTagAttribute =>
  Effect.gen(function* (_) {
    const transformService = yield * _(TransformService)

    switch (templateTagAttribute.name.$value) {
      case 'class': {
        templateTagAttribute.name.$value = 'className'
        break
      }
      case 'for': {
        templateTagAttribute.name.$value = 'htmlFor'
        break
      }
    }

    const wrapValue = (value: string) => Effect.gen(function* () {
      const isStringValue
        = 'value' in templateTagAttribute && typeof templateTagAttribute.value !== 'boolean'

      if (templateTagAttribute.name.$value === 'style') {
        if (isStringValue)
          return `{{ cssText: "${value}" }}`

        return `{{ cssText: ${value} }}`
      }

      if (isStringValue)
        return `"${value}"`

      return `{${value}}`
    })

    const getValue = () => Effect.gen(function* (_) {
      if ('value' in templateTagAttribute) {
        if (typeof templateTagAttribute.value === 'boolean')
          return String(templateTagAttribute.value)

        return templateTagAttribute.value.$value
      }

      if ('expression' in templateTagAttribute)
        return yield * _(transformService.transformExpression(templateTagAttribute.expression))

      return 'true'
    })

    return String.prototype.concat(
      templateTagAttribute.name.$value,
      '=',
      yield * _(
        pipe(
          getValue(),
          Effect.flatMap(wrapValue),
        ),
      ),
    )
  })
