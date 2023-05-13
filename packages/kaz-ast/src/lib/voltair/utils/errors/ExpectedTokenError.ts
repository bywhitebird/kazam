import type { Token } from '../../Token'

export class ExpectedTokenError extends Error {
  public expectedToken: Token

  constructor(expectedToken: Token) {
    super(`Expected token "${expectedToken.$rawValue}" (${expectedToken.tmName}).`)

    this.name = 'ExpectedTokenError'

    this.expectedToken = expectedToken
  }
}
