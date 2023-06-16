import { Token } from '../../../lib/voltair'

export const RightParenthesisToken = new Token({
  $name: 'RightParenthesisToken',
  validator: /^\)$/,
  singleCharacter: true,
  semantic: {
    type: 'punctuation',
    modifiers: ['parenthesis', 'right'],
    textmateScope: ['punctuation.parenthesis'],
  },
})
