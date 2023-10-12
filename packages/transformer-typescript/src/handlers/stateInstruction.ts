import type { IHandler } from '../transformer-typescript'

export const handleStateInstruction: IHandler<'stateInstruction'> = (stateInstruction, { addGeneratedContent }) => {
  addGeneratedContent('let ')
  addGeneratedContent(stateInstruction.name)

  if (stateInstruction.type !== undefined) {
    addGeneratedContent(': ')
    addGeneratedContent(stateInstruction.type)
  }

  if (stateInstruction.defaultValue !== undefined) {
    addGeneratedContent(' = ')
    addGeneratedContent(stateInstruction.defaultValue.expression)
  }
  else {
    addGeneratedContent(' = {} as any')
  }

  addGeneratedContent(';\n')
}
