import type { IHandler } from '../transformer-vue'

export const handleTemplateFor: IHandler<'templateFor'> = async (templateFor, { handle }) => {
  return `Array.from((
    function* () {
      for (${templateFor.parameters}) {
        yield createVNode(
          Fragment,
          null, 
          [${await Promise.all(templateFor.children.map(handle)).then(children => children.join(',\n'))}]
        )
      }
    }
  )())`
}
