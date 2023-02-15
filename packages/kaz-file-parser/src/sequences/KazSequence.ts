import { g, gp, s } from '../lib/voltair'

import { InstructionsSequence } from '.'

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
