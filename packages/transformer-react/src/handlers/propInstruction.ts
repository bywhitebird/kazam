import type { IHandler } from '../transformer-react'

export const handlePropInstruction: IHandler<'propInstruction'> = (propInstruction, { transformExpression }) => {
  return {
    declaration: `${propInstruction.name.$value}`
      + `${propInstruction.defaultValue !== undefined ? ` = ${transformExpression(propInstruction.defaultValue.expression)}` : ''}`,
    type: `${propInstruction.name.$value}: ${propInstruction.type?.$value ?? 'any'}`,
  }
}
