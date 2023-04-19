import { g, gp, s } from '../../../lib/voltair'
import { InstructionsSequence } from '../../instruction'
import { TemplateSequence } from '../../template'

export const KazSequence = gp(
  'Kaz',
  s(
    g(
      'instructions',
      InstructionsSequence,
      { forceMultiple: true },
    ),
    g(
      'template',
      TemplateSequence,
      { forceMultiple: true },
    ),
  ),
)
