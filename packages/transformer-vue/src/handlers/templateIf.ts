import type { IHandler } from '../transformer-vue'
import { mergeTextChildren } from '../utils/merge-text-children'

export const handleTemplateIf: IHandler<'templateIf'> = (templateIf, { handle }) => {
  return `${templateIf.condition.$value}
      ? [${mergeTextChildren(templateIf.children).map(handle).join(',\n')}]
      : ${templateIf.else !== undefined
        ? handle(templateIf.else)
        : 'null'
      }
  `
}
