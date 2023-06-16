import { Token } from '../../../lib/voltair'

export const EqualToken = new Token({
  $name: 'EqualToken',
  validator: /^=$/,
  singleCharacter: true,
  semantic: {
    type: 'punctuation',
    modifiers: ['equal'],
    textmateScope: ['punctuation.equal'],
  },
})
