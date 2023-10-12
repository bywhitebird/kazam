import type { IHandler } from '../transformer-vue'
import { mergeTextChildren } from '../utils/merge-text-children'

export const handleTemplateElse: IHandler<'templateElse'> = (templateElse, { handle }) => {
  return `[${mergeTextChildren(templateElse.children).map(handle).join(',\n')}]`
}
