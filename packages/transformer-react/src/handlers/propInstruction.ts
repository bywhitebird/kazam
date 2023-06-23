import type { IHandler } from '../transformer-react'

export const handlePropInstruction: IHandler<'propInstruction'> = async (propInstruction, { transformExpression }) => {
  return {
    declaration: `${propInstruction.name.$value}`
      + `${propInstruction.defaultValue !== undefined ? ` = ${await transformExpression(propInstruction.defaultValue.expression)}` : ''}`,
    type: `${propInstruction.name.$value}: ${propInstruction.type?.$value ?? 'any'}`,
  }
}
