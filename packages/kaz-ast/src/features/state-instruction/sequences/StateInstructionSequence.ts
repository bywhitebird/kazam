import { StateInstructionToken } from '..'
import { g, gp, s } from '../../../lib/voltair'
import { IdentifierToken, TypeAnnotationSequence, VariableDeclarationSequence } from '../../../shared'

export const StateInstructionSequence = gp(
  'StateInstruction',
  s(
    StateInstructionToken,
    g('name', IdentifierToken),
    s(g('type', TypeAnnotationSequence), { optional: true }),
    s(
      g(
        'defaultValue',
        s(
          g('expression', VariableDeclarationSequence),
        ),
      ),
      { optional: true },
    ),
    {
      tmScope: 'meta.state',
      tmName: 'StateInstruction',
    },
  ),
)
