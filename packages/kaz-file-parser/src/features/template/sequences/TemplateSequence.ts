import { s } from '../../../lib/voltair'
import { ConditionLogicalSequence } from '../../condition-logical'
import { ForLogicalSequence } from '../../for-logical'

export const TemplateSequence = s(
  s.union([
    () => ForLogicalSequence,
    () => ConditionLogicalSequence,
  ]),
  { min: 0 },
)
