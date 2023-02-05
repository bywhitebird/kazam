import { type Token, createToken } from '../../../classes/Token'
import { ImportInstructionContext } from '../../../contexts/instructions/imports/ImportInstructionContext'

export const FromKeywordImportToken = createToken({
  $name: 'FromKeywordImportToken',
  validator: /^from$/,
  inContexts: [ImportInstructionContext],
})

export const isFromKeywordImportToken = (token: Token): token is typeof FromKeywordImportToken => token.$name === FromKeywordImportToken.$name
