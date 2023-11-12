import { kazamMagicStrings } from '@whitebird/kazam-transform-utils'

import type { IHandler } from '../transformer-typescript'

export const handlePropInstruction: IHandler<'propInstruction'> = (propInstruction, { addGeneratedContent, options }) => {
  addGeneratedContent(propInstruction.name)

  if (options.withKazamInternalJsDoc)
    addGeneratedContent(` /** ${kazamMagicStrings.kazPropJSDoc.create()} */`)

  if (propInstruction.type !== undefined) {
    addGeneratedContent(': ')
    addGeneratedContent(propInstruction.type)
  }

  if (propInstruction.defaultValue !== undefined) {
    addGeneratedContent(' = ')
    addGeneratedContent(propInstruction.defaultValue.expression)
  }

  // Add a trailing comma if this is not the last prop
  addGeneratedContent(',\n')
}
