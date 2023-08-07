import { Token } from '../../../lib/voltair'

export const LeftCurlyBracketToken = new Token({
  $name: 'LeftCurlyBracketToken',
  validator: /^{$/,
  singleCharacter: true,
  semantic: {
    type: 'punctuation',
    modifiers: ['curly-bracket', 'left'],
    textmateScope: ['punctuation.curly-bracket'],
  },
})
