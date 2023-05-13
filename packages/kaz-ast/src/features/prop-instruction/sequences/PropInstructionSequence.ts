import { PropInstructionToken } from '..'
import { g, gp, s } from '../../../lib/voltair'
import { IdentifierToken, TypeAnnotationSequence, VariableDeclarationSequence } from '../../../shared'

export const PropInstructionSequence = gp(
  'PropInstruction',
  s(
    PropInstructionToken,
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
      tmScope: 'meta.prop',
      tmName: 'PropInstruction',
    },
  ),
)
