import { ForLeftParenthesisToken, ForLogicalToken, ForParametersToken, ForRightParenthesisToken } from '..'
import { g, gp, s } from '../../../lib/voltair'
import { LeftCurlyBracketToken, RightCurlyBracketToken } from '../../../shared'
import { TemplateSequence } from '../../template'

export const ForLogicalSequence = gp(
  'ForLogical',
  s(
    ForLogicalToken,
    ForLeftParenthesisToken,
    g('parameters', ForParametersToken),
    ForRightParenthesisToken,
    LeftCurlyBracketToken,
    g('children', TemplateSequence, { forceMultiple: true }),
    RightCurlyBracketToken,
  ),
)
