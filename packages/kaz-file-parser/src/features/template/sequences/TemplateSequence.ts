import { s } from '../../../lib/voltair'
import { ForLogicalSequence } from '../../for-logical'

export const TemplateSequence = s(
  s.union([
    () => ForLogicalSequence,
  ]),
  { min: 0 },
)
