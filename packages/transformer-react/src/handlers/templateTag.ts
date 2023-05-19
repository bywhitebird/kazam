import type { IHandler } from '../transformer-react'

export const handleTemplateTag: IHandler<'templateTag'> = async (templateTag, { handle }) => {
  return `<${templateTag.tagName.$value} `
    + `${(await Promise.all(templateTag.attributes.map(attribute => handle(attribute)))).join(' ')}`
    + `${(templateTag.children === undefined)
      ? '/>'
      : `>${(await Promise.all(templateTag.children.map(child => handle(child)))).join('\n')}</${templateTag.tagName.$value}>`
    }`
}
