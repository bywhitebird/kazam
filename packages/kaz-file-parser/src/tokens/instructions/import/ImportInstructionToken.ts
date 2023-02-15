import { InstructionContext } from '../../../contexts'
import { ImportInstructionContext } from '../../../contexts/instructions/ImportInstructionContext'
import { type Token, createToken } from '../../../lib/voltair'

export const ImportInstructionToken = createToken({
  $name: 'ImportInstructionToken',
  validator: /^import$/,
  startContexts: [ImportInstructionContext],
  inContexts: [InstructionContext],
})

export const isImportInstructionToken = (token: Token): token is typeof ImportInstructionToken => token.$name === ImportInstructionToken.$name
