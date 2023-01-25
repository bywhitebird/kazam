import { createContext } from '../../classes/Context'

export const InstructionContext = createContext({
  $name: 'InstructionContext',
  breakingPatterns: [/\s+/],
})
