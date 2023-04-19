import { ImportInstructionContext } from '..'
import { Token } from '../../../lib/voltair'

export const WildcardCharacterToken = new Token({
  $name: 'WildcardCharacterToken',
  validator: /^\*$/,
  inContexts: [() => ImportInstructionContext],
})
