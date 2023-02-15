import { type Context, createContext } from '../lib/voltair'
import { ExpressionToken } from '../tokens'

export const ExpressionContext: Context<'ExpressionContext'> = createContext({
  $name: 'ExpressionContext',
  breakingPatterns: [/\s+/],
  availableTokens: [() => ExpressionToken],
})
