import type { IHandler } from '../transformer-vue'
import { transformVueExpression } from '../utils/transform-vue-expression'

export const handlePropInstruction: IHandler<'propInstruction'> = async (propInstruction, { addImport }) => {
  addImport({
    namedImports: [
      { name: 'PropType', typeOnly: true },
    ],
    path: 'vue',
  })

  return `${propInstruction.name.$value}: {
    type: undefined as unknown as PropType<${propInstruction.type?.$value ?? 'any'}>,
    skipCheck: true,
    ${propInstruction.defaultValue !== undefined ? `default: ${transformVueExpression(propInstruction.defaultValue.expression.$value)},` : ''}
  }`
}
