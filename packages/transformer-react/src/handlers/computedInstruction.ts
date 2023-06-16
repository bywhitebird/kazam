import type { IHandler } from '../transformer-react'

export const handleComputedInstruction: IHandler<'computedInstruction'> = async (computedInstruction, { transformExpression }) => {
  return `const ${computedInstruction.name.$value}`
    + `${computedInstruction.type !== undefined ? `: ${computedInstruction.type.$value}` : ''}`
    + ` = ${await transformExpression(computedInstruction.computeValue.expression)}`
}
