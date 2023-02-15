import { parse } from '@typescript-eslint/parser'

import { ExpressionContext } from '../contexts/ExpressionContext'
import { type Token, createToken } from '../lib/voltair'

const getExpression = (rawValue: string) => {
  const parsed = parse(`const _ = ${rawValue}`)
  const variable = parsed.body[0]

  if (variable?.type !== 'VariableDeclaration' || variable.declarations[0] === undefined)
    throw new Error(`Invalid expression: ${rawValue}`)

  return variable.declarations[0].init
}

export const ExpressionToken = createToken({
  $name: 'ExpressionToken',
  validator: (rawValue: string) => {
    try {
      getExpression(rawValue)
      return true
    }
    catch {
      return false
    }
  },
  getValue: rawValue => rawValue.trim(),
  inContexts: [ExpressionContext],
  endContexts: [ExpressionContext],
})

export const isExpressionToken = (token: Token): token is typeof ExpressionToken => token.$name === ExpressionToken.$name
