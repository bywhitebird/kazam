import type { IHandler } from '../transformer-vue'

export const handleComputedInstruction: IHandler<'computedInstruction'> = (computedInstruction, { addImport }) => {
  addImport({
    namedImports: [
      { name: 'computed' },
    ],
    path: 'vue',
  })

  return `const ${computedInstruction.name.$value} = computed${
    computedInstruction.type === undefined
      ? ''
      : `<${computedInstruction.type.$value}>`
  }(() => ${computedInstruction.computeValue.expression.$value})`
}
