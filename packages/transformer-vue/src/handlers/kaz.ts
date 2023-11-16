import type { kazPropInstructionSchema } from '@whitebird/kaz-ast'
import type { z } from 'zod'

import type { IHandler } from '../transformer-vue'
import { mergeTextChildren } from '../utils/merge-text-children'

export const handleKaz: IHandler<'ast'> = (kaz, { addImport, handle }) => {
  addImport({
    namedImports: [
      { name: 'defineComponent' },
      { name: 'createVNode' },
      { name: 'Fragment' },
      { name: 'toRefs' },
      { name: 'ref' },
      { name: 'unref' },
    ],
    path: 'vue',
  })

  const importInstructions = kaz.instructions.filter(instruction => instruction.$type === 'ImportInstruction')
  importInstructions.forEach(instruction => handle(instruction))

  const propInstructions = kaz.instructions.filter(instruction => instruction.$type === 'PropInstruction') as z.infer<typeof kazPropInstructionSchema>[]
  const propsDeclaration = propInstructions.map(prop => handle(prop)).join(',\n')

  const otherInstructions = kaz.instructions.filter(instruction => instruction.$type !== 'ImportInstruction' && instruction.$type !== 'PropInstruction')

  return `
    export default defineComponent({
      props: {
        ${propsDeclaration}
      },
      setup(props) {
        return (({ ${propInstructions.map(prop => prop.name.$value).join(', ')} }) => {
          ${otherInstructions.map(instruction => handle(instruction)).join('\n')}

          return () => (
            createVNode(
              Fragment,
              null,
              [
                ${mergeTextChildren(kaz.template).map(child => handle(child)).join(',\n')}
              ],
            )
          )
        })(toRefs(props))
      },
    })
  `
}
