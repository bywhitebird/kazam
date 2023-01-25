import { type Token, createToken } from '../../../classes/Token'
import { InstructionContext } from '../../../contexts'
import { ImportInstructionContext } from '../../../contexts/instructions/imports/ImportInstructionContext'

export const ImportInstructionToken = createToken({
  $name: 'ImportInstructionToken',
  pattern: /^import$/,
  startContexts: [ImportInstructionContext],
  inContexts: [InstructionContext],
})

export const isImportInstructionToken = (token: Token): token is typeof ImportInstructionToken => token.$name === ImportInstructionToken.$name
