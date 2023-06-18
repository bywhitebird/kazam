import { TagAttributesContext, TagContext } from '..'
import { Token } from '../../../lib/voltair'

export const TagLeftParenthesisToken = new Token({
  $name: 'TagLeftParenthesis',
  startContexts: [() => TagAttributesContext],
  validator: /^\($/,
  singleCharacter: true,
  inContexts: [() => TagContext],
  semantic: {
    type: 'punctuation',
    modifiers: ['parenthesis', 'left'],
    textmateScope: ['punctuation.parenthesis'],
  },
})
