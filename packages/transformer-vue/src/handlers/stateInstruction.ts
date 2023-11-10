import type { IHandler } from '../transformer-vue'

export const handleStateInstruction: IHandler<'stateInstruction'> = (stateInstruction, { addImport }) => {
  addImport({
    namedImports: [
      { name: 'ref' },
    ],
    path: 'vue',
  })

  return `const ${stateInstruction.name.$value} = ref${
    stateInstruction.type === undefined
      ? ''
      : `<${stateInstruction.type.$value}>`
  }(${stateInstruction.defaultValue !== undefined ? stateInstruction.defaultValue.expression.$value : ''})`
}
