import { TypeToken } from '..'
import { Context } from '../../../lib/voltair'

export const TypeContext: Context<'TypeContext'> = new Context({
  $name: 'TypeContext',
  breakingPatterns: [/\s+/, /[^a-zA-Z_$a-zA-Z0-9]/],
  availableTokens: [TypeToken],
})
