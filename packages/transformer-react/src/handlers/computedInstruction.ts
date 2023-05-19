import type { IHandler } from '../transformer-react'

export const handleComputedInstruction: IHandler<'computedInstruction'> = async (computedInstruction) => {
  return `const ${computedInstruction.name.$value}`
    + `${computedInstruction.type !== undefined ? `: ${computedInstruction.type.$value}` : ''}`
    + ` = ${computedInstruction.computeValue.expression.$value}`
}
