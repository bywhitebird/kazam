import type { Token } from './types/Token'
import * as validators from './validators'

const allValidators = Object.values(validators)

export const validate = (tokens: Token[]) => {
  const validatorResults = allValidators.map(validator => validator(tokens))
  return validatorResults.find(result => result)
}
