import type { IHandler } from '../transformer-typescript'

export const handleKaz: IHandler<'ast'> = (kaz, { handle, addGeneratedContent }) => {
  // First handle imports
  const importInstructions = kaz.instructions.filter(instruction => instruction.$type === 'ImportInstruction')
  importInstructions.forEach(handle)

  // Then handle props
  addGeneratedContent('(\n')
  const propInstructions = kaz.instructions.filter(instruction => instruction.$type === 'PropInstruction')
  propInstructions.forEach(handle)
  addGeneratedContent(') => {\n')

  // Then handle the rest of the instructions
  const otherInstructions = kaz.instructions.filter(instruction => instruction.$type !== 'ImportInstruction' && instruction.$type !== 'PropInstruction')
  otherInstructions.forEach(handle)

  // Then handle the template
  kaz.template.forEach(handle)

  // Then close the component function
  addGeneratedContent('}\n')
}
