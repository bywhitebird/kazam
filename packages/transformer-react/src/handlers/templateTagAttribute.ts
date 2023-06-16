import type { IHandler } from '../transformer-react'

export const handleTemplateTagAttribute: IHandler<'templateTagAttribute'> = async (templateTagAttribute, { transformExpression }) => {
  return `${templateTagAttribute.name.$value}=`
    + `${await (async () => {
      if ('value' in templateTagAttribute) {
        if (typeof templateTagAttribute.value === 'boolean')
          return `{${templateTagAttribute.value}}`

        return `"${templateTagAttribute.value.$value}"`
      }

      if ('expression' in templateTagAttribute)
        return `{${await transformExpression(templateTagAttribute.expression)}}`

      return '{true}'
    })()}`
}
