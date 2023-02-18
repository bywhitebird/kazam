import { TypeToken } from '..'
import { Context } from '../../../lib/voltair'

export const TypeContext: Context<'TypeContext'> = new Context({
  $name: 'TypeContext',
  breakingPatterns: [/\s+/],
  availableTokens: [TypeToken],
})
