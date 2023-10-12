import type { IHandler } from '../transformer-typescript'

export const handleTemplateTag: IHandler<'templateTag'> = (templateTag, { handle, addGeneratedContent }) => {
  addGeneratedContent('(({}: {\n')
  templateTag.attributes.forEach((attribute) => {
    if (attribute.$type === 'TagAttribute')
      addGeneratedContent(`${attribute.name.$value}: any;\n`)
    else if (attribute.$type === 'TagEventAttribute')
      addGeneratedContent(`${attribute.name.$value}: (event: Event) => void;\n`)
  })
  addGeneratedContent('\n}) => {\n')

  if (templateTag.children !== undefined && templateTag.children.length > 0)
    templateTag.children.forEach(handle)

  addGeneratedContent('})({\n')
  templateTag.attributes.forEach(handle)
  addGeneratedContent('});\n')
}
