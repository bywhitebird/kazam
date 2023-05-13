import { Token } from '../../../lib/voltair'

export const LeftCurlyBracketToken = new Token({
  $name: 'LeftCurlyBracketToken',
  validator: /^{$/,
  singleCharacter: true,
  tmScope: 'punctuation.definition.curly-brackets.begin',
})
