import * as path from 'node:path'

import type { IHandler } from '../transformer-react'

export const handleKaz: IHandler<'ast'> = (kaz, { handle, componentMeta, addImport }) => {
  addImport({ wildcardImport: { alias: 'React' }, path: 'react' })

  const importInstructions = kaz.instructions.filter(instruction => instruction.$type === 'ImportInstruction')
  const propInstructions = kaz.instructions.filter(instruction => instruction.$type === 'PropInstruction')
  const otherInstructions = kaz.instructions.filter(instruction => instruction.$type !== 'ImportInstruction' && instruction.$type !== 'PropInstruction')

  importInstructions.forEach(instruction => handle(instruction))

  const props = propInstructions.map(instruction => handle(instruction)) as { declaration: string; type: string }[]
  const propsDeclaration = props.map(prop => prop.declaration).join(', ')
  const propsType = props.map(prop => prop.type).join(', ')

  const componentName = path.basename(componentMeta.name, path.extname(componentMeta.name))

  return `
    export const ${componentName} = (${props.length > 0 ? `{ ${propsDeclaration} }: { ${propsType} }` : ''}) => {
      ${otherInstructions.map(instruction => handle(instruction)).join('\n')}

      return (<>
        ${kaz.template.map(instruction => handle(instruction)).join('\n')}
      </>)
    }
  `
}
