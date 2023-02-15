import { createContext } from '../../lib/voltair'
import { TextToken } from '../../tokens'
import { InstructionContext } from './InstructionContext'

export const PropInstructionContext = createContext({
  $name: 'PropInstructionContext',
  breakingPatterns: [...(InstructionContext.breakingPatterns ?? []), /^,$/, /^:$/, /^=$/],
  forbiddenTokens: [TextToken],
})
