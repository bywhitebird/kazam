import { ForLogicalContext } from '..'
import { Token } from '../../../lib/voltair'

export const ForRightParenthesisToken = new Token({
  $name: 'ForRightParenthesis',
  inContexts: [() => ForLogicalContext],
  validator: /^\)$/,
  singleCharacter: true,
  semantic: {
    type: 'punctuation',
    modifiers: ['parenthesis', 'right'],
    textmateScope: ['punctuation.parenthesis'],
  },
})
