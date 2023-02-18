import { Context } from '../../../lib/voltair'
import { TextToken } from '../../../shared'

export const ImportInstructionContext = new Context({
  $name: 'ImportInstructionContext',
  breakingPatterns: [/\s+/, /^,$/],
  forbiddenTokens: [() => TextToken],
})
