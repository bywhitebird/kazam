import { parse } from '@typescript-eslint/parser'

import { IfConditionContext } from '..'
import { ExpressionToken } from '../../../shared'

const getExpression = (rawValue: string) => {
  const parsed = parse(`if (${rawValue}) {}`)
  const ifExpression = parsed.body[0]

  if (
    ifExpression?.type !== 'IfStatement'
  )
    throw new Error(`Invalid expression: ${rawValue}`)

  return rawValue
}

export const IfConditionToken = ExpressionToken.extends({
  $name: 'IfParameters',
  validator: (rawValue: string) => {
    try {
      getExpression(rawValue)
      return true
    }
    catch {
      return false
    }
  },
  getValue(rawValue) {
    const trimmedRawValue = rawValue.trim()

    if (trimmedRawValue.startsWith('{') && trimmedRawValue.endsWith('}'))
      return trimmedRawValue.slice(1, -1).trim()

    return trimmedRawValue
  },
  inContexts: [() => IfConditionContext],
  endContexts: [() => IfConditionContext],
})
