import type { IHandler } from '../transformer-vue'
import { transformVueExpression } from '../utils/transform-vue-expression'

export const handleWatchInstruction: IHandler<'watchInstruction'> = async (watchInstruction, { addImport }) => {
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
      ${transformVueExpression(watchInstruction.callbackExpression.$value)}
    }
  )`
}
