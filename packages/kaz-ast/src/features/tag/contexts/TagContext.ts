import { Context } from '../../../lib/voltair'
import { TextToken } from '../../../shared'

export const TagContext = new Context({
  $name: 'TagContext',
  breakingPatterns: [/\s+/, /^\($/, /^\)$/, /^\{$/, /^\}$/],
  forbiddenTokens: [() => TextToken],
})
