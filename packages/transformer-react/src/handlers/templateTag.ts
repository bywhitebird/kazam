import type { IHandler } from '../transformer-react'

export const handleTemplateTag: IHandler<'templateTag'> = (templateTag, { handle, checkIsComponent, importComponent }) => {
  const isComponent = checkIsComponent(templateTag.tagName.$value)

  if (isComponent)
    importComponent(templateTag.tagName.$value)

  return `<${templateTag.tagName.$value} `
    + `${(templateTag.attributes.map(attribute => handle(attribute))).join(' ')}`
    + `${(templateTag.children === undefined)
      ? '/>'
      : `>${(templateTag.children.map(child => handle(child))).join('\n')}</${templateTag.tagName.$value}>`
    }`
}
