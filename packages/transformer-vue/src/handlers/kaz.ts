import type { kazPropInstructionSchema } from '@whitebird/kaz-ast'
import type { z } from 'zod'

import type { IHandler } from '../transformer-vue'

export const handleKaz: IHandler<'ast'> = async (kaz, { addImport, handle }) => {
  addImport({
    namedImports: [
      { name: 'defineComponent' },
      { name: 'createVNode' },
      { name: 'Fragment' },
      { name: 'toRefs' },
      { name: 'ref' }, // import ref by default because it's used in transform-vue-expression.ts
    ],
    path: 'vue',
  })

  const importInstructions = kaz.instructions.filter(instruction => instruction.$type === 'ImportInstruction')
  await Promise.all(importInstructions.map(instruction => handle(instruction)))

  const propInstructions = kaz.instructions.filter(instruction => instruction.$type === 'PropInstruction') as z.infer<typeof kazPropInstructionSchema>[]
  const propsDeclaration = await Promise.all(propInstructions.map(prop => handle(prop))).then(props => props.join(',\n'))

  const otherInstructions = kaz.instructions.filter(instruction => instruction.$type !== 'ImportInstruction' && instruction.$type !== 'PropInstruction')

  return `
    export default defineComponent({
      props: {
        ${propsDeclaration}
      },
      setup(props) {
        return (({ ${propInstructions.map(prop => prop.name).join(', ')} }) => {
          ${await Promise.all(otherInstructions.map(instruction => handle(instruction))).then(instructions => instructions.join('\n'))}

          return () => (
            createVNode(
              Fragment,
              null,
              [
                ${await Promise.all(kaz.template.map(child => handle(child))).then(children => children.join(',\n'))}
              ],
            )
          )
        })(toRefs(props))
      },
    })
  `
}
