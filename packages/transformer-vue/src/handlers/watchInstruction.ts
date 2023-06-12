import type { IHandler } from '../transformer-vue'

export const handleWatchInstruction: IHandler<'watchInstruction'> = async (watchInstruction, { addImport }) => {
  addImport({
    namedImports: [
      { name: 'watch' },
    ],
    path: 'vue'
  })

  return `watch(
    [
      ${watchInstruction.watchedVariables.map(variable => variable.name).join(', ')}
    ],
    ([${watchInstruction.watchedVariables.map(variable => variable.name).join(', ')}]) => {
      ${watchInstruction.callbackExpression}
    }
  )`
}
