import { Context } from '../../../lib/voltair'
import { TextToken } from '../../../shared'
import { InstructionContext } from '../../instruction/contexts/InstructionContext'

export const PropInstructionContext = new Context({
  $name: 'PropInstructionContext',
  breakingPatterns: [...(InstructionContext.breakingPatterns ?? []), /^,$/, /^:$/, /^=$/],
  forbiddenTokens: [() => TextToken],
})
