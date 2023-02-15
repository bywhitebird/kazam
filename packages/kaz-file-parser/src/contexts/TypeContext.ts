import { type Context, createContext } from '../lib/voltair'
import { TypeToken } from '../tokens'

export const TypeContext: Context<'TypeContext'> = createContext({
  $name: 'TypeContext',
  breakingPatterns: [/\s+/],
  availableTokens: [() => TypeToken],
})
