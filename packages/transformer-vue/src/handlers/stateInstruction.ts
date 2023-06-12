import type { IHandler } from '../transformer-vue'
import { transformVueExpression } from '../utils/transform-vue-expression'

export const handleStateInstruction: IHandler<'stateInstruction'> = async (stateInstruction, { addImport }) => {
  addImport({
    namedImports: [
      { name: 'ref' },
    ],
    path: 'vue',
  })

  return `const ${stateInstruction.name} = ref${
    stateInstruction.type === undefined
      ? ''
      : `<${stateInstruction.type}>`
  }(${stateInstruction.defaultValue !== undefined ? transformVueExpression(stateInstruction.defaultValue.expression) : ''})`
}
