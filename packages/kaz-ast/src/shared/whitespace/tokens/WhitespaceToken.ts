import { Token } from '../../../lib/voltair'

export const WhitespaceToken = new Token({
  $name: 'WhitespaceToken',
  validator: /^\s+$/,
  ignore: true,
})
