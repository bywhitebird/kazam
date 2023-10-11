import type { IHandler } from '../transformer-vue'
import { mergeTextChildren } from '../utils/merge-text-children'

export const handleTemplateFor: IHandler<'templateFor'> = (templateFor, { handle }) => {
  return `Array.from((
    function* () {
      for (${templateFor.parameters.$value}) {
        yield createVNode(
          Fragment,
          null, 
          [${mergeTextChildren(templateFor.children).map(handle).join(',\n')}]
        )
      }
    }
  )())`
}
