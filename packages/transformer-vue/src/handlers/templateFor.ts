import type { IHandler } from '../transformer-vue'
import { mergeTextChildren } from '../utils/merge-text-children'

export const handleTemplateFor: IHandler<'templateFor'> = async (templateFor, { handle }) => {
  return `Array.from((
    function* () {
      for (${templateFor.parameters.$value}) {
        yield createVNode(
          Fragment,
          null, 
          [${await Promise.all(mergeTextChildren(templateFor.children).map(handle)).then(children => children.join(',\n'))}]
        )
      }
    }
  )())`
}
