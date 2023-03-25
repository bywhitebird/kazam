import { Token } from '../../../lib/voltair'

export const TextToken = new Token({
  $name: 'TextToken',
  validator: /.+/,
  getValue: rawValue => rawValue,
})
