import type { IHandler } from '../transformer-react'

export const handleWatchInstruction: IHandler<'watchInstruction'> = (watchInstruction, { addImport, transformExpression }) => {
  addImport({ namedImports: [{ name: 'useEffect' }], path: 'react' })

  return `useEffect(() => {${transformExpression(watchInstruction.callbackExpression)}}, [${watchInstruction.watchedVariables.map(variable => variable.name.$value).join(', ')}])`
}
