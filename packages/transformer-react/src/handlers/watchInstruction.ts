import type { IHandler } from '../transformer-react'

export const handleWatchInstruction: IHandler<'watchInstruction'> = async (watchInstruction, { addImport }) => {
  addImport({ namedImports: [{ name: 'useEffect' }], path: 'react' })

  return `useEffect(() => {${watchInstruction.callbackExpression.$value}}, [${watchInstruction.watchedVariables.map(variable => variable.name.$value).join(', ')}])`
}
