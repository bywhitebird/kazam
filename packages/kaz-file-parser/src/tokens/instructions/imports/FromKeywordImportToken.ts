import { ImportInstructionContext } from '../../../contexts/instructions/imports/ImportInstructionContext'
import type { Token } from '../../../types/Token'
import { createToken } from '../../utils/create-token'

export const FromKeywordImportToken = createToken({
  $name: 'FromKeywordImportToken',
  $rawValue: '',
  $index: 0,
  pattern: /^from$/,
  inContexts: [ImportInstructionContext],
})

export const isFromKeywordImportToken = (token: Token): token is typeof FromKeywordImportToken => token.$name === FromKeywordImportToken.$name
