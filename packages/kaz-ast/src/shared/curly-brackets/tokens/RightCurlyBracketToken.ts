import { Token } from '../../../lib/voltair'

export const RightCurlyBracketToken = new Token({
  $name: 'RightCurlyBracketToken',
  validator: /^}$/,
  singleCharacter: true,
  semantic: {
    type: 'punctuation',
    modifiers: ['curly-bracket', 'right'],
    textmateScope: ['punctuation.curly-bracket'],
  },
})
