import { Token } from '../../../lib/voltair'

export const ColonToken = new Token({
  $name: 'ColonToken',
  validator: /^:$/,
  singleCharacter: true,
  semantic: {
    type: 'punctuation',
    modifiers: ['colon'],
    textmateScope: ['punctuation.colon'],
  },
})
