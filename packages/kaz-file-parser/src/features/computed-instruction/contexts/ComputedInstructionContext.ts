import { Context } from '../../../lib/voltair'
import { TextToken } from '../../../shared'

export const ComputedInstructionContext = new Context({
  $name: 'ComputedInstructionContext',
  breakingPatterns: [/\s+/, /^,$/, /^:$/, /^=$/],
  forbiddenTokens: [() => TextToken],
})
