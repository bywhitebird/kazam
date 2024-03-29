import { parse } from '@babel/parser'

import { ConditionContext } from '..'
import { Token } from '../../../lib/voltair'

const getExpression = (rawValue: string) => {
  const parsed = parse(`if (${rawValue}) {}`, {
    plugins: ['typescript'],
  })
  const ifExpression = parsed.program.body[0]

  if (
    ifExpression?.type !== 'IfStatement'
  )
    throw new Error(`Invalid expression: ${rawValue}`)

  return rawValue
}

export const IfConditionToken = new Token({
  $name: 'IfCondition',
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
  inContexts: [() => ConditionContext],
  endContexts: [() => ConditionContext],
})
