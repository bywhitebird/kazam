import { Context } from '../../../lib/voltair'
import { EqualToken, EqualVariableDeclarationToken, TextToken } from '../../../shared'

export const WatchInstructionContext = new Context({
  $name: 'WatchInstructionContext',
  breakingPatterns: [/\s+/, /^\($/, /^\)$/, /^=>$/],
  forbiddenTokens: [() => TextToken, () => EqualToken, () => EqualVariableDeclarationToken],
})
