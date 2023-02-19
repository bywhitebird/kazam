import { Context } from '../../../lib/voltair'
import { EqualToken, EqualVariableDeclarationToken, TextToken } from '../../../shared'

export const EventInstructionContext = new Context({
  $name: 'EventInstructionContext',
  breakingPatterns: [/\s+/, /^\($/, /^\)$/, /^=>$/, /^,$/, /^:/],
  forbiddenTokens: [() => TextToken, () => EqualToken, () => EqualVariableDeclarationToken],
})
