import { createContext } from '../../../classes/Context'
import { TextToken } from '../../../tokens'
import { InstructionContext } from '../InstructionContext'

export const PropInstructionContext = createContext({
  $name: 'PropInstructionContext',
  breakingPatterns: [...(InstructionContext.breakingPatterns ?? []), /^,$/, /^:$/, /^=$/],
  forbiddenTokens: [TextToken],
})
