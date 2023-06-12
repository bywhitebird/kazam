import type { IHandler } from '../transformer-vue'
import { transformVueExpression } from '../utils/transform-vue-expression'

export const handleComputedInstruction: IHandler<'computedInstruction'> = async (computedInstruction, { addImport }) => {
  addImport({
    namedImports: [
      { name: 'computed' },
    ],
    path: 'vue',
  })

  return `const ${computedInstruction.name} = computed${
    computedInstruction.type === undefined
      ? ''
      : `<${computedInstruction.type}>`
  }(() => ${transformVueExpression(computedInstruction.computeValue.expression)})`
}
