import { IfConditionToken, IfLeftParenthesisToken, IfLogicalToken, IfRightParenthesisToken } from '..'
import { g, gp, s } from '../../../lib/voltair'
import { LeftCurlyBracketToken, RightCurlyBracketToken } from '../../../shared'
import { TemplateSequence } from '../../template'

export const IfLogicalSequence = gp(
  'IfLogical',
  s(
    IfLogicalToken,
    IfLeftParenthesisToken,
    g('condition', IfConditionToken),
    IfRightParenthesisToken,
    LeftCurlyBracketToken,
    g('children', () => TemplateSequence, { forceMultiple: true }),
    RightCurlyBracketToken,
  ),
)
