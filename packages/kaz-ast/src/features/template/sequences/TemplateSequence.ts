import { TemplateExpressionEndToken, TemplateExpressionStartToken } from '..'
import { g, gp, s } from '../../../lib/voltair'
import { ExpressionToken } from '../../../shared'
import { ConditionLogicalSequence } from '../../condition-logical'
import { ForLogicalSequence } from '../../for-logical'
import { TagNameOrTextToken, TagSequence } from '../../tag'

export const TemplateSequence = s(
  s.union(
    [
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
          g('expression', s(() => ExpressionToken)),
          () => TemplateExpressionEndToken,
          {
            tmScope: 'meta.template-expression.kaz',
            tmName: 'TemplateExpression',
          },
        ),
      ),
    ],
    // {
    //   tmScope: 'meta.template.kaz',
    //   tmName: 'TemplateSequence',
    // },
  ),
  {
    min: 0,
    tmScope: 'meta.template.kaz',
    tmName: 'TemplateSequence',
  },
)
