import { Context } from '../../../lib/voltair'
import { TextToken } from '../../../shared'

export const ForLogicalContext = new Context({
  $name: 'ForLogicalContext',
  breakingPatterns: [/\s+/, /^\($/, /^\)$/, /^\{$/, /^\}$/],
  forbiddenTokens: [() => TextToken],
})
