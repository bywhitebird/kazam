import type { IHandler } from '../transformer-vue'

export const handleWatchInstruction: IHandler<'watchInstruction'> = (watchInstruction, { addImport }) => {
  addImport({
    namedImports: [
      { name: 'watch' },
    ],
    path: 'vue',
  })

  return `watch(
    [
      ${watchInstruction.watchedVariables.map(variable => variable.name.$value).join(', ')}
    ],
    ([${watchInstruction.watchedVariables.map(variable => variable.name.$value).join(', ')}]) => {
      ${watchInstruction.callbackExpression.$value}
    }
  )`
}
