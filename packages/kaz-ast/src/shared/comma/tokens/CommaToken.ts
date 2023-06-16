import { Token } from '../../../lib/voltair'

export const CommaToken = new Token ({
  $name: 'CommaToken',
  validator: /^,$/,
  singleCharacter: true,
  semantic: {
    type: 'punctuation',
    modifiers: ['comma'],
    textmateScope: ['punctuation.comma'],
  },
})
