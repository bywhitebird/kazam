import { Token } from '../../../lib/voltair'

export const RightParenthesisToken = new Token({
  $name: 'RightParenthesisToken',
  validator: /^\)$/,
  singleCharacter: true,
  tmScope: 'punctuation.definition.parentheses',
})
