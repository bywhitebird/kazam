import type { IHandler } from '../transformer-react'

export const handleTemplateTagAttribute: IHandler<'templateTagAttribute'> = async (templateTagAttribute, { transformExpression }) => {
  switch (templateTagAttribute.name.$value) {
    case 'class': {
      templateTagAttribute.name.$value = 'className'
    }
  }

  return `${templateTagAttribute.name.$value}=`
    + `${await (async () => {
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

      const value = await (async () => {
        if ('value' in templateTagAttribute) {
          if (typeof templateTagAttribute.value === 'boolean')
            return templateTagAttribute.value

          return templateTagAttribute.value.$value
        }

        if ('expression' in templateTagAttribute)
          return await transformExpression(templateTagAttribute.expression)

        return 'true'
      })()

      return `${startChars}${value}${endChars}`
    })()}`
}
