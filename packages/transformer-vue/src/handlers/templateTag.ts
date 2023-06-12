import type { IHandler } from '../transformer-vue'

export const handleTemplateTag: IHandler<'templateTag'> = async (templateTag, { handle, checkIsComponent, importComponent }) => {
  const isComponent = await checkIsComponent(templateTag.tagName)

  if (isComponent)
    importComponent(templateTag.tagName)

  return `createVNode(
    ${isComponent ? templateTag.tagName : JSON.stringify(templateTag.tagName)},
    {
      ${await Promise.all(templateTag.attributes.map(attribute => handle(attribute))).then(attributes => attributes.join(',\n'))}
    },
    ${(templateTag.children === undefined)
      ? 'null'
      : `[
        ${await Promise.all(templateTag.children.map(child => handle(child))).then(children => children.join(',\n'))}
      ]`
    },
  )`
}
