import { TagAttributeSeparatorToken, TagAttributeSequence, TagLeftParenthesisToken, TagNameOrTextToken, TagRightParenthesisToken } from '..'
import { g, gp, s } from '../../../lib/voltair'
import { LeftCurlyBracketToken, RightCurlyBracketToken } from '../../../shared'
import { TemplateSequence } from '../../template'

const TagAttributesSequence = s(
  TagAttributeSequence,
  s(
    s(
      TagAttributeSeparatorToken,
      TagAttributeSequence,
      { min: 0 },
    ),
    { optional: true },
  ),
  s(
    TagAttributeSeparatorToken,
    { optional: true },
  ),
  { optional: true },
)

export const TagSequence = gp(
  'Tag',
  s(
    g('tagName', () => TagNameOrTextToken),
    TagLeftParenthesisToken,
    g(
      'attributes',
      TagAttributesSequence,
      { forceMultiple: true },
    ),
    TagRightParenthesisToken,
    s(
      LeftCurlyBracketToken,
      g('children', () => TemplateSequence, { forceMultiple: true }),
      RightCurlyBracketToken,
      { optional: true },
    ),
  ),
)
