import { kazamMagicStrings } from '@whitebird/kazam-transform-utils'

import type { IHandler } from '../transformer-typescript'

export const handleComputedInstruction: IHandler<'computedInstruction'> = (computedInstruction, { addGeneratedContent, options }) => {
  addGeneratedContent('const ')
  addGeneratedContent(computedInstruction.name)

  if (options.withKazamInternalJsDoc)
    addGeneratedContent(` /** ${kazamMagicStrings.kazComputedJSDoc.create()} */`)

  if (computedInstruction.type !== undefined) {
    addGeneratedContent(': ')
    addGeneratedContent(computedInstruction.type)
  }

  addGeneratedContent(' = ')
  addGeneratedContent(computedInstruction.computeValue.expression)
  addGeneratedContent(';\n')
}
