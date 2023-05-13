import { Token } from '../../../lib/voltair'

export const IdentifierToken = new Token({
  $name: 'IdentifierToken',
  validator: /^[a-zA-Z_$][a-zA-Z_$0-9]*$/,
  getValue: rawValue => rawValue,
  tmScope: 'variable.other.readwrite',
  // tmMatch: '\\b[a-zA-Z_$][a-zA-Z_$0-9]*\\b',
  tmMatch: '\\b(?!from\\b)[a-zA-Z_$][a-zA-Z_$0-9]*\\b',
})
