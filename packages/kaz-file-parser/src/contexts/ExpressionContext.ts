import { type Context, createContext } from '../classes/Context'
import { ExpressionToken } from '../tokens'

export const ExpressionContext: Context<'ExpressionContext'> = createContext({
  $name: 'ExpressionContext',
  breakingPatterns: [/\s+/],
  availableTokens: [() => ExpressionToken],
})
