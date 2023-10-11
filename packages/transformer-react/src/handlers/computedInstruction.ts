import type { IHandler } from '../transformer-react'

export const handleComputedInstruction: IHandler<'computedInstruction'> = (computedInstruction, { transformExpression }) => {
  return `const ${computedInstruction.name.$value}`
    + `${computedInstruction.type !== undefined ? `: ${computedInstruction.type.$value}` : ''}`
    + ` = ${transformExpression(computedInstruction.computeValue.expression)}`
}
