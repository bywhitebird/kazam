import { Token } from '../../../lib/voltair'
import { SingleQuotedStringContext } from '../contexts/StringContext'

export const SingleQuoteToken = new Token({
  $name: 'SingleQuoteToken',
  validator: /^'$/,
  singleCharacter: true,
  startContexts: [() => SingleQuotedStringContext],
  endContexts: [() => SingleQuotedStringContext],
})
