import type { IHandler } from '../transformer-vue'
import { mergeTextChildren } from '../utils/merge-text-children'

export const handleTemplateElse: IHandler<'templateElse'> = async (templateElse, { handle }) => {
  return `[${await Promise.all(mergeTextChildren(templateElse.children).map(handle)).then(children => children.join(',\n'))}]`
}
