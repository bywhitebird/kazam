import type { IHandler } from '../transformer-react'

export const handlePropInstruction: IHandler<'propInstruction'> = async (propInstruction) => {
  return {
    declaration: `${propInstruction.name}\
      ${propInstruction.defaultValue !== undefined ? ` = ${propInstruction.defaultValue.expression}` : ''}`,
    type: `${propInstruction.name}: ${propInstruction.type ?? 'any'}`,
  }
}
