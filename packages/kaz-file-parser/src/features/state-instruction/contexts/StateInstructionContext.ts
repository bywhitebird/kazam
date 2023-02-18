import { Context } from '../../../lib/voltair'
import { TextToken } from '../../../shared'

export const StateInstructionContext = new Context({
  $name: 'StateInstructionContext',
  breakingPatterns: [/\s+/, /^,$/, /^:$/, /^=$/],
  forbiddenTokens: [() => TextToken],
})
