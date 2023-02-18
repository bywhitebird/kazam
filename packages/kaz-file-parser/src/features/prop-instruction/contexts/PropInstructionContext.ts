import { Context } from '../../../lib/voltair'
import { TextToken } from '../../../shared'

export const PropInstructionContext = new Context({
  $name: 'PropInstructionContext',
  breakingPatterns: [/\s+/, /^,$/, /^:$/, /^=$/],
  forbiddenTokens: [() => TextToken],
})
