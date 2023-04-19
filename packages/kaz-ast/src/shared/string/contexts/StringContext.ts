import { Context } from '../../../lib/voltair'
import { DoubleQuotedStringToken } from '../tokens/DoubleQuotedStringToken'
import { SingleQuotedStringToken } from '../tokens/SingleQuotedStringToken'
import { SingleQuoteToken } from '../tokens/SingleQuoteToken'

export const DoubleQuotedStringContext: Context<'DoubleQuotedStringContext'> = new Context({
  $name: 'DoubleQuotedStringContext',
  breakingPatterns: [/^[\n"]$/],
  availableTokens: [() => DoubleQuotedStringToken, () => SingleQuoteToken],
})

export const SingleQuotedStringContext: Context<'SingleQuotedStringContext'> = new Context({
  $name: 'SingleQuotedStringContext',
  breakingPatterns: [/^[\n']$/],
  availableTokens: [() => SingleQuotedStringToken, () => SingleQuoteToken],
})
