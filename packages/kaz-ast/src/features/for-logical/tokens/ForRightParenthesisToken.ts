import { ForLogicalContext } from '..'
import { Token } from '../../../lib/voltair'

export const ForRightParenthesisToken = new Token({
  $name: 'ForRightParenthesis',
  inContexts: [() => ForLogicalContext],
  validator: /^\)$/,
  singleCharacter: true,
  tmScope: 'punctuation.section.parens.end.kaz',
})
