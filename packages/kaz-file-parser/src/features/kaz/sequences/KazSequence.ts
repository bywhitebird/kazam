import { g, gp, s } from '../../../lib/voltair'
import { InstructionsSequence } from '../../instruction'

export const KazSequence = gp(
  'Kaz',
  s(
    g(
      'instructions',
      InstructionsSequence,
      { forceMultiple: true },
    ),
  ),
)
