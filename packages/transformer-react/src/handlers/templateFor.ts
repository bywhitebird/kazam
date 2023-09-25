import type { IHandler } from '../transformer-react'

export const handleTemplateFor: IHandler<'templateFor'> = (templateFor, { handle, addImport }) => {
  addImport({ namedImports: [{ name: 'Fragment' }], path: 'react' })

  return `{Array.from((
    function* () {
      let key = 0
      for (${templateFor.parameters.$value}) {
        yield <Fragment key={key++}>
          ${templateFor.children.map(handle).join('\n')}
        </Fragment>
      }
    }
  )())}`
}
