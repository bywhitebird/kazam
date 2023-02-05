import { type Context, createContext } from '../classes/Context'
import { TypeToken } from '../tokens'

export const TypeContext: Context<'TypeContext'> = createContext({
  $name: 'TypeContext',
  breakingPatterns: [/\s+/],
  availableTokens: [() => TypeToken],
})
