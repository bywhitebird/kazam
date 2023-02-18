import { Context } from '../../../lib/voltair'

export const DoubleQuotedStringContext = new Context({
  $name: 'DoubleQuotedStringContext',
  breakingPatterns: [/^[\n"]$/],
})

export const SingleQuotedStringContext = new Context({
  $name: 'SingleQuotedStringContext',
  breakingPatterns: [/^[\n']$/],
})
