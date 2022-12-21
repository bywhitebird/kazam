import { expect } from 'vitest'

export const expectToEqualIgnoreWhitespace = (actual: string, expected: string) => {
  expect(actual.replace(/\s/g, '')).toEqual(expected.replace(/\s/g, ''))
}
