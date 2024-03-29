import type { IHandler } from '../transformer-typescript'

export const handleWatchInstruction: IHandler<'watchInstruction'> = (watchInstruction, { addGeneratedContent }) => {
  addGeneratedContent('(({ ')

  watchInstruction.watchedVariables.forEach((watchedVariable) => {
    addGeneratedContent(watchedVariable.name.$value)

    if (watchedVariable.type !== undefined) {
      addGeneratedContent(': ')
      addGeneratedContent(watchedVariable.type)
    }

    addGeneratedContent(', ')
  })

  addGeneratedContent('}) => {')
  addGeneratedContent(watchInstruction.callbackExpression)
  addGeneratedContent('})')
  addGeneratedContent('({')

  watchInstruction.watchedVariables.forEach((watchedVariable) => {
    addGeneratedContent('"')
    addGeneratedContent(watchedVariable.name.$value)
    addGeneratedContent('": ')
    addGeneratedContent(watchedVariable.name)
    addGeneratedContent(', ')
  })

  addGeneratedContent('});\n')
}
