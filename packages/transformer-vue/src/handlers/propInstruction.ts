import type { IHandler } from '../transformer-vue'
import { transformVueExpression } from '../utils/transform-vue-expression'

export const handlePropInstruction: IHandler<'propInstruction'> = async (propInstruction, { addImport }) => {
  addImport({
    namedImports: [
      { name: 'PropType', typeOnly: true },
    ],
    path: 'vue',
  })

  return `${propInstruction.name}: {
    type: undefined as unknown as PropType<${propInstruction.type ?? 'any'}>,
    skipCheck: true,
    ${propInstruction.defaultValue !== undefined ? `default: ${transformVueExpression(propInstruction.defaultValue.expression)},` : ''}
  }`
}
