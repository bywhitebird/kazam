import { Token } from '../../../lib/voltair'

export const RightCurlyBracketToken = new Token({
  $name: 'RightCurlyBracketToken',
  validator: /^}$/,
  singleCharacter: true,
  tmScope: 'punctuation.definition.block',
})
