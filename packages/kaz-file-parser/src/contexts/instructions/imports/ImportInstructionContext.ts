import { TextToken } from '../../../tokens'
import { createContext } from '../../utils/create-context'
import { InstructionContext } from '../InstructionContext'

export const ImportInstructionContext = createContext({
  $name: 'ImportInstructionContext',
  breakingPatterns: [...(InstructionContext.breakingPatterns ?? []), /^,$/],
  forbiddenTokens: [TextToken],
})
