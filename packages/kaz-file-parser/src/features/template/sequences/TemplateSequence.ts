import { s } from '../../../lib/voltair'
import { ForLogicalSequence } from '../../for-logical'
import { IfLogicalSequence } from '../../if-logical'

export const TemplateSequence = s(
  s.union([
    () => ForLogicalSequence,
    () => IfLogicalSequence,
  ]),
  { min: 0 },
)
