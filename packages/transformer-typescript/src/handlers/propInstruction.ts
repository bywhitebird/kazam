import type { IHandler } from '../transformer-typescript'

export const handlePropInstruction: IHandler<'propInstruction'> = async (propInstruction, { addGeneratedContent }) => {
  addGeneratedContent(propInstruction.name)

  if (propInstruction.type !== undefined) {
    addGeneratedContent(': ')
    addGeneratedContent(propInstruction.type)
  }

  if (propInstruction.defaultValue !== undefined) {
    addGeneratedContent(' = ')
    addGeneratedContent(propInstruction.defaultValue.expression)
  }

  // Add a trailing comma if this is not the last prop
  addGeneratedContent(',\n')
}
