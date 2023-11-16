import type { IHandler } from '../transformer-vue'

export const handleStateInstruction: IHandler<'stateInstruction'> = (stateInstruction, { addImport }) => {
  addImport({
    namedImports: [
      { name: 'ref' },
      { name: 'unref' },
    ],
    path: 'vue',
  })

  return `const ${stateInstruction.name.$value} = ref${
    stateInstruction.type === undefined
      ? ''
      : `<${stateInstruction.type.$value}>`
  }(unref(${stateInstruction.defaultValue !== undefined ? stateInstruction.defaultValue.expression.$value : ''}))`
}
