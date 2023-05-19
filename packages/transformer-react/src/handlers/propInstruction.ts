import type { IHandler } from '../transformer-react'

export const handlePropInstruction: IHandler<'propInstruction'> = async (propInstruction) => {
  return {
    declaration: `${propInstruction.name.$value}`
      + `${propInstruction.defaultValue !== undefined ? ` = ${propInstruction.defaultValue.expression.$value}` : ''}`,
    type: `${propInstruction.name.$value}: ${propInstruction.type?.$value ?? 'any'}`,
  }
}
