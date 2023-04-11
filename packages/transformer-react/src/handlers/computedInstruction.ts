import type { IHandler } from '../transformer-react'

export const handleComputedInstruction: IHandler<'computedInstruction'> = async (computedInstruction) => {
  return `
    const ${computedInstruction.name}\
    ${computedInstruction.type !== undefined ? `: ${computedInstruction.type}` : ''}\
    = ${computedInstruction.computeValue.expression}
  `
}
