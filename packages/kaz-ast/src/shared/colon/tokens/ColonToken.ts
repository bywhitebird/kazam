import { Token } from '../../../lib/voltair'

export const ColonToken = new Token({
  $name: 'ColonToken',
  validator: /^:$/,
  singleCharacter: true,
  tmScope: 'punctuation.definition.colon',
})
