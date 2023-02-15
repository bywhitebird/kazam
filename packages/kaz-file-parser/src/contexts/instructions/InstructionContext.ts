import { createContext } from '../../lib/voltair'

export const InstructionContext = createContext({
  $name: 'InstructionContext',
  breakingPatterns: [/\s+/],
})
