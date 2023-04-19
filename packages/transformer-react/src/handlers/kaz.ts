import * as path from 'node:path'

import type { IHandler } from '../transformer-react'

export const handleKaz: IHandler<'ast'> = async (kaz, { handle, componentMeta, addImport }) => {
  addImport({ defaultImport: { name: 'React' }, path: 'react' })

  const importInstructions = kaz.instructions.filter(instruction => instruction.$type === 'ImportInstruction')
  const watchInstructions = kaz.instructions.filter(instruction => instruction.$type === 'WatchInstruction')
  const computedInstructions = kaz.instructions.filter(instruction => instruction.$type === 'ComputedInstruction')
  const stateInstructions = kaz.instructions.filter(instruction => instruction.$type === 'StateInstruction')
  const propInstructions = kaz.instructions.filter(instruction => instruction.$type === 'PropInstruction')

  await Promise.all(importInstructions.map(instruction => handle(instruction)))

  const props = await Promise.all(propInstructions.map(instruction => handle(instruction))) as { declaration: string; type: string }[]
  const propsDeclaration = props.map(prop => prop.declaration).join(', ')
  const propsType = props.map(prop => prop.type).join(', ')

  const componentName = path.basename(componentMeta.name, path.extname(componentMeta.name))

  return `
    export const ${componentName} = (${props.length > 0 ? `{ ${propsDeclaration} }: { ${propsType} }` : ''}) => {
      ${await Promise.all(stateInstructions.map(instruction => handle(instruction))).then(instructions => instructions.join('\n'))}
      ${await Promise.all(computedInstructions.map(instruction => handle(instruction))).then(instructions => instructions.join('\n'))}
      ${await Promise.all(watchInstructions.map(instruction => handle(instruction))).then(instructions => instructions.join('\n'))}

      return (<>
        ${await Promise.all(kaz.template.map(instruction => handle(instruction))).then(instructions => instructions.join('\n'))}
      </>)
    }
  `
}
