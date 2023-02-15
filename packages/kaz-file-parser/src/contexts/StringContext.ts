import { createContext } from '../lib/voltair'

export const DoubleQuotedStringContext = createContext({
  $name: 'DoubleQuotedStringContext',
  breakingPatterns: [/^[\n"]$/],
})

export const SingleQuotedStringContext = createContext({
  $name: 'SingleQuotedStringContext',
  breakingPatterns: [/^[\n']$/],
})
