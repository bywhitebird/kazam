import { ImportInstructionContext } from '..'
import { Token } from '../../../lib/voltair'

export const AliasKeywordToken = new Token({
  $name: 'AliasKeywordToken',
  validator: /^as$/,
  inContexts: [() => ImportInstructionContext],
  tmScope: 'keyword.control.as.kaz',
})
