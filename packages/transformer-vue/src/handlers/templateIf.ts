import type { IHandler } from '../transformer-vue'
import { mergeTextChildren } from '../utils/merge-text-children'
import { transformVueExpression } from '../utils/transform-vue-expression'

export const handleTemplateIf: IHandler<'templateIf'> = async (templateIf, { handle }) => {
  return `${transformVueExpression(templateIf.condition.$value)}
      ? [${await Promise.all(mergeTextChildren(templateIf.children).map(handle)).then(child => child.join(',\n'))}]
      : ${templateIf.else !== undefined
        ? await handle(templateIf.else)
        : 'null'
      }
  `
}
