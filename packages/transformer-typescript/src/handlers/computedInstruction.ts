import type { IHandler } from '../transformer-typescript'

export const handleComputedInstruction: IHandler<'computedInstruction'> = async (computedInstruction, { addGeneratedContent }) => {
  addGeneratedContent('const ')
  addGeneratedContent(computedInstruction.name)

  if (computedInstruction.type !== undefined) {
    addGeneratedContent(': ')
    addGeneratedContent(computedInstruction.type)
  }

  addGeneratedContent(' = ')
  addGeneratedContent(computedInstruction.computeValue.expression)
  addGeneratedContent(';\n')
}
