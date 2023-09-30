import type { IHandler } from '../transformer-vue'
import { mergeTextChildren } from '../utils/merge-text-children'

export const handleTemplateTag: IHandler<'templateTag'> = (templateTag, { handle, checkIsComponent, importComponent }) => {
  const isComponent = checkIsComponent(templateTag.tagName.$value)

  if (isComponent)
    importComponent(templateTag.tagName.$value)

  return `createVNode(
    ${isComponent ? templateTag.tagName.$value : JSON.stringify(templateTag.tagName.$value)},
    {
      ${templateTag.attributes.map(attribute => handle(attribute)).join(',\n')}
    },
    ${(templateTag.children === undefined)
      ? 'null'
      : `[
        ${mergeTextChildren(templateTag.children).map(child => handle(child)).join(',\n')}
      ]`
    },
  )`
}
