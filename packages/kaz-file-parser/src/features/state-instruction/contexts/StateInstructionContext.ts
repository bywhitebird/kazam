import { Context } from '../../../lib/voltair'
import { TextToken } from '../../../shared'
import { InstructionContext } from '../../instruction/contexts/InstructionContext'

export const StateInstructionContext = new Context({
  $name: 'StateInstructionContext',
  breakingPatterns: [...(InstructionContext.breakingPatterns ?? []), /^,$/, /^:$/, /^=$/],
  forbiddenTokens: [() => TextToken],
})
