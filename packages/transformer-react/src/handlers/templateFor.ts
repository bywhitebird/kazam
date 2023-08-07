import type { IHandler } from '../transformer-react'

export const handleTemplateFor: IHandler<'templateFor'> = async (templateFor, { handle, addImport }) => {
  addImport({ namedImports: [{ name: 'Fragment' }], path: 'react' })

  return `{Array.from((
    function* () {
      let key = 0
      for (${templateFor.parameters.$value}) {
        yield <Fragment key={key++}>
          ${await Promise.all(templateFor.children.map(handle)).then(instructions => instructions.join('\n'))}
        </Fragment>
      }
    }
  )())}`
}
