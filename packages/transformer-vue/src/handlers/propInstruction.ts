import type { IHandler } from '../transformer-vue'

export const handlePropInstruction: IHandler<'propInstruction'> = (propInstruction, { addImport }) => {
  addImport({
    namedImports: [
      { name: 'PropType', typeOnly: true },
    ],
    path: 'vue',
  })

  return `${propInstruction.name.$value}: {
    type: undefined as unknown as PropType<${propInstruction.type?.$value ?? 'any'}>,
    skipCheck: true,
    ${propInstruction.defaultValue !== undefined ? `default: ${propInstruction.defaultValue.expression.$value},` : ''}
  }`
}
