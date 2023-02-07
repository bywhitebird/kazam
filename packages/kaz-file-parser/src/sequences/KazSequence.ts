import { g } from '../classes/groups/Group'
import { gp } from '../classes/groups/GroupParent'
import { s } from '../classes/Sequence'

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
