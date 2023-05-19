import { Token } from '../../../lib/voltair'

export const LeftParenthesisToken = new Token({
  $name: 'LeftParenthesisToken',
  validator: /^\($/,
  singleCharacter: true,
  semantic: {
    type: 'punctuation',
    modifiers: ['parenthesis', 'left'],
    textmateScope: ['punctuation.parenthesis'],
  },
})
