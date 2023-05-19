import type { IHandler } from '../transformer-react'

export const handleTemplateTagAttribute: IHandler<'templateTagAttribute'> = async (templateTagAttribute) => {
  return `${templateTagAttribute.name.$value}=`
    + `${(() => {
      if ('value' in templateTagAttribute) {
        if (typeof templateTagAttribute.value === 'boolean')
          return `{${templateTagAttribute.value}}`

        return `"${templateTagAttribute.value.$value}"`
      }

      if ('expression' in templateTagAttribute)
        return `{${templateTagAttribute.expression.$value}}`

      return '{true}'
    })()}`
}
