import { Token } from '../../../lib/voltair'

export const CommaToken = new Token ({
  $name: 'CommaToken',
  validator: /^,$/,
  singleCharacter: true,
  tmScope: 'punctuation.definition.comma',
})
