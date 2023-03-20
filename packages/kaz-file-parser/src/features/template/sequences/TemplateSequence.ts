import { g, gp, s } from '../../../lib/voltair'
import { ConditionLogicalSequence } from '../../condition-logical'
import { ForLogicalSequence } from '../../for-logical'
import { TagNameOrTextToken, TagSequence } from '../../tag'

export const TemplateSequence = s(
  s.union([
    () => ForLogicalSequence,
    () => ConditionLogicalSequence,
    () => TagSequence,
    gp(
      'Text',
      g('text', () => TagNameOrTextToken),
    ),
  ]),
  { min: 0 },
)
