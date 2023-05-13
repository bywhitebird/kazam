import { Token } from '../../../lib/voltair'

export const LeftParenthesisToken = new Token({
  $name: 'LeftParenthesisToken',
  validator: /^\($/,
  singleCharacter: true,
  tmScope: 'punctuation.definition.parentheses',
})
