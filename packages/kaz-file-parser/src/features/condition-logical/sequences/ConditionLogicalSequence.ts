import { ElseIfLogicalToken, ElseLogicalToken, IfConditionToken, IfLeftParenthesisToken, IfLogicalToken, IfRightParenthesisToken } from '..'
import { g, gp, s } from '../../../lib/voltair'
import { LeftCurlyBracketToken, RightCurlyBracketToken } from '../../../shared'
import { TemplateSequence } from '../../template'

const ElseLogicalSequence = g(
  'else',
  s(
    gp(
      'ElseLogical',
      s(
        ElseLogicalToken,
        s.union([
          s(
            LeftCurlyBracketToken,
            g('children', () => TemplateSequence, { forceMultiple: true }),
            RightCurlyBracketToken,
          ),
          g(
            'if',
            s(
              gp(
                'ElseIfLogical',
                s(
                  ElseIfLogicalToken,
                  IfLeftParenthesisToken,
                  g('condition', IfConditionToken),
                  IfRightParenthesisToken,
                  LeftCurlyBracketToken,
                  g('children', () => TemplateSequence, { forceMultiple: true }),
                  RightCurlyBracketToken,
                  s(() => ElseLogicalSequence, { optional: true }),
                ),
              ),
            ),
          ),
        ]),
      ),
    ),
  ),
)

export const ConditionLogicalSequence = gp(
  'IfLogical',
  s(
    IfLogicalToken,
    IfLeftParenthesisToken,
    g('condition', IfConditionToken),
    IfRightParenthesisToken,
    LeftCurlyBracketToken,
    g('children', () => TemplateSequence, { forceMultiple: true }),
    RightCurlyBracketToken,
    s(ElseLogicalSequence, { optional: true }),
  ),
)
