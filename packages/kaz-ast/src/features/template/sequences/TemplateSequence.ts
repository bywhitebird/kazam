import { TemplateExpressionEndToken, TemplateExpressionLeftCurlyToken, TemplateExpressionStartToken } from '..'
import { g, gp, s } from '../../../lib/voltair'
import { ExpressionToken } from '../../../shared'
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
    gp(
      'Expression',
      s(
        () => TemplateExpressionStartToken,
        () => TemplateExpressionLeftCurlyToken,
        g('expression', s(() => ExpressionToken)),
        () => TemplateExpressionEndToken,
      ),
    ),
  ]),
  { min: 0 },
)
