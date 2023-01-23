import { InstructionContext } from '../../../contexts'
import { ImportInstructionContext } from '../../../contexts/instructions/imports/ImportInstructionContext'
import type { Token } from '../../../types/Token'
import { createToken } from '../../utils/create-token'

export const ImportInstructionToken = createToken({
  $name: 'ImportInstructionToken',
  $rawValue: '',
  $index: 0,
  pattern: /^import$/,
  startContexts: [ImportInstructionContext],
  inContexts: [InstructionContext],
})

export const isImportInstructionToken = (token: Token): token is typeof ImportInstructionToken => token.$name === ImportInstructionToken.$name
