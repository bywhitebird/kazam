import type { IHandler } from '../transformer-vue'
import { mergeTextChildren } from '../utils/merge-text-children'

export const handleTemplateTag: IHandler<'templateTag'> = async (templateTag, { handle, checkIsComponent, importComponent }) => {
  const isComponent = await checkIsComponent(templateTag.tagName.$value)

  if (isComponent)
    importComponent(templateTag.tagName.$value)

  return `createVNode(
    ${isComponent ? templateTag.tagName.$value : JSON.stringify(templateTag.tagName.$value)},
    {
      ${await Promise.all(templateTag.attributes.map(attribute => handle(attribute))).then(attributes => attributes.join(',\n'))}
    },
    ${(templateTag.children === undefined)
      ? 'null'
      : `[
        ${await Promise.all(mergeTextChildren(templateTag.children).map(child => handle(child))).then(children => children.join(',\n'))}
      ]`
    },
  )`
}
