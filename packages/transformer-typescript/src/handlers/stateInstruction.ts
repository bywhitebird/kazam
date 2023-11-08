import { kazamMagicStrings } from '@whitebird/kazam-transform-utils'

import type { IHandler } from '../transformer-typescript'

export const handleStateInstruction: IHandler<'stateInstruction'> = (stateInstruction, { addGeneratedContent, options }) => {
  addGeneratedContent('let ')
  addGeneratedContent(stateInstruction.name)

  if (options.withKazamInternalJsDoc)
    addGeneratedContent(` /** ${kazamMagicStrings.kazStateJSDoc.create()} */`)

  if (stateInstruction.type !== undefined) {
    addGeneratedContent(': ')
    addGeneratedContent(stateInstruction.type)
  }

  if (stateInstruction.defaultValue !== undefined) {
    addGeneratedContent(' = ')
    addGeneratedContent(stateInstruction.defaultValue.expression)
  }
  else {
    addGeneratedContent(' = {} as any')
  }

  addGeneratedContent(';\n')
}
