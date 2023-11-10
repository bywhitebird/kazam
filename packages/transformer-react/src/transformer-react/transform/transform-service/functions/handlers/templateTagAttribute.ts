import { Effect, pipe } from 'effect'

import type { Handle } from '../handle'

export const handleTemplateTagAttribute: Handle<'templateTagAttribute', string> = templateTagAttribute =>
  Effect.gen(function* (_) {
    switch (templateTagAttribute.name.$value) {
      case 'class': {
        templateTagAttribute.name.$value = 'className'
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

    const getValue = () => Effect.gen(function* () {
      if ('value' in templateTagAttribute) {
        if (typeof templateTagAttribute.value === 'boolean')
          return String(templateTagAttribute.value)

        return templateTagAttribute.value.$value
      }

      if ('expression' in templateTagAttribute)
        return templateTagAttribute.expression.$value

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
