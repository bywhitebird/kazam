import type { IHandler } from '../transformer-react'

export const handleTemplateTagAttribute: IHandler<'templateTagAttribute'> = (templateTagAttribute, { transformExpression }) => {
  return `${templateTagAttribute.name.$value}=`
    + `${(() => {
      const [startChars, endChars] = ((): [string, string] => {
        const isStringValue = 'value' in templateTagAttribute && typeof templateTagAttribute.value !== 'boolean'

        if (templateTagAttribute.name.$value === 'style') {
          if (isStringValue)
            return ['{{ cssText: "', '" }}']

          return ['{{ cssText: ', ' }}']
        }

        if (isStringValue)
          return ['"', '"']

        return ['{', '}']
      })()

      const value = (() => {
        if ('value' in templateTagAttribute) {
          if (typeof templateTagAttribute.value === 'boolean')
            return templateTagAttribute.value

          return templateTagAttribute.value.$value
        }

        if ('expression' in templateTagAttribute)
          return transformExpression(templateTagAttribute.expression)

        return 'true'
      })()

      return `${startChars}${value}${endChars}`
    })()}`
}
