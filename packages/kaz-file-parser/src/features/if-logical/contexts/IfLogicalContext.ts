import { Context } from '../../../lib/voltair'
import { TextToken } from '../../../shared'

export const IfLogicalContext = new Context({
  $name: 'IfLogicalContext',
  breakingPatterns: [/\s+/, /^\($/, /^\)$/, /^\{$/, /^\}$/],
  forbiddenTokens: [() => TextToken],
})
