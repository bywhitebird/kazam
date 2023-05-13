import { Token } from '../../../lib/voltair'

export const EqualToken = new Token({
  $name: 'EqualToken',
  validator: /^=$/,
  singleCharacter: true,
  tmScope: 'punctuation.definition.equal',
})
