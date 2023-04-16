import { Token } from '../../../lib/voltair'

export const LeftCurlyBracketToken = new Token({
  $name: 'LeftCurlyBracketToken',
  validator: /^{$/,
})
