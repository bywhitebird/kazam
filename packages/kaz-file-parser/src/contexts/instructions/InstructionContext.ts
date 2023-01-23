import { createContext } from '../utils/create-context'

export const InstructionContext = createContext({
  $name: 'InstructionContext',
  breakingPatterns: [/\s+/],
})
