import type { Token } from '../../types/Token'

export class ExpectedTokenError extends Error {
  public expectedToken: Token

  constructor(expectedToken: Token) {
    super(`Expected token "${expectedToken.$rawValue}" (${expectedToken.$name}).`)

    this.name = 'ExpectedTokenError'

    this.expectedToken = expectedToken
  }
}
