import { expect } from 'vitest'

export const checkAST = (actual: unknown, expected: unknown) => {
  if (Array.isArray(expected)) {
    expect(actual).toSatisfy(Array.isArray)
    expect(actual).toHaveLength(expected.length)

    expected.forEach((expectedItem, index) => {
      checkAST((actual as unknown[])[index], expectedItem)
    })
  }
  else if (Object.prototype.toString.call(expected) === '[object Object]') {
    expect(actual).toSatisfy((actual: unknown) => Object.prototype.toString.call(actual) === '[object Object]')
    expect(Object.keys(actual as Record<string, unknown>)).toEqual(expect.arrayContaining(Object.keys(expected as Record<string, unknown>)))

    Object.entries(expected as Record<string, unknown>).forEach(([key, value]) => {
      checkAST((actual as Record<string, unknown>)[key], value)
    })
  }
  else {
    if (typeof actual === 'object' && actual !== null && '$value' in actual)
      expect(actual.$value).toEqual(expected)
    else
      expect(actual).toEqual(expected)
  }
}
