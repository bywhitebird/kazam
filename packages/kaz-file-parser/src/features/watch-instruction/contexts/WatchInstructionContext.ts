import { Context } from '../../../lib/voltair'
import { EqualToken, EqualVariableDeclarationToken, TextToken } from '../../../shared'
import { TagNameOrTextToken } from '../../tag'

export const WatchInstructionContext = new Context({
  $name: 'WatchInstructionContext',
  breakingPatterns: [/\s+/, /^\($/, /^\)$/, /^=>$/, /^,$/, /^:/],
  forbiddenTokens: [() => TextToken, () => TagNameOrTextToken, () => EqualToken, () => EqualVariableDeclarationToken],
})
