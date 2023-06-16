import { Token } from '../../../lib/voltair'

export const IdentifierToken = new Token({
  $name: 'IdentifierToken',
  validator: /^[a-zA-Z_$][a-zA-Z_$0-9]*$/,
  getValue: rawValue => rawValue,
  semantic: {
    type: 'variable',
  },
})
