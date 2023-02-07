import { g } from '../../../classes/groups/Group'
import { gp } from '../../../classes/groups/GroupParent'
import { s } from '../../../classes/Sequence'
import * as Tokens from '../../../tokens'

export const StateInstructionSequence = gp(
  'StateInstruction',
  s(
    Tokens.StartInstructionToken,
    Tokens.StateInstructionToken,
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
