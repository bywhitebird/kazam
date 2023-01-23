import { createContext } from './utils/create-context'

export const DoubleQuotedStringContext = createContext({
  $name: 'DoubleQuotedStringContext',
  breakingPatterns: [/^[\n"]$/],
})

export const SingleQuotedStringContext = createContext({
  $name: 'SingleQuotedStringContext',
  breakingPatterns: [/^[\n']$/],
})
