import { g, gp, s } from '../../../lib/voltair'
import * as Tokens from '../../../tokens'

export const ComputedInstructionSequence = gp(
  'ComputedInstruction',
  s(
    Tokens.StartInstructionToken,
    Tokens.ComputedInstructionToken,
    g('name', Tokens.IdentifierToken),
    g(
      'type',
      s(
        Tokens.DeclarationTypeColonToken,
        Tokens.TypeToken,
        { optional: true },
      ),
    ),
    g(
      'defaultValue',
      s(
        Tokens.DeclarationValueEqualToken,
        g(
          'expression',
          Tokens.ExpressionToken,
        ),
        { optional: true },
      ),
    ),
    Tokens.EndInstructionToken,
  ),
)
