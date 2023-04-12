import type { IHandler } from '../transformer-react'

export const handleTemplateFor: IHandler<'templateFor'> = async (templateFor, { handle }) => {
  return `{Array.from((
    function* () {
      for (${templateFor.parameters}) {
        yield <>${await Promise.all(templateFor.children.map(handle)).then(instructions => instructions.join('\n'))}</>
      }
    }
  )())}`
}
