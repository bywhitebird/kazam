import { ForLogicalContext, ForParametersContext } from '..'
import { Token } from '../../../lib/voltair'

export const ForLeftParenthesisToken = new Token({
  $name: 'ForLeftParenthesis',
  startContexts: [() => ForParametersContext],
  inContexts: [() => ForLogicalContext],
  validator: /^\($/,
  singleCharacter: true,
  tmScope: 'punctuation.section.parens.begin.kaz',
})
