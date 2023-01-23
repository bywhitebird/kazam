import type { Token } from '../../types/Token'

export class UnexpectedTokenError extends Error {
  public expectedTokens?: Token[] | undefined
  public token: Token

  constructor(token: Token, expectedTokens?: Token[]) {
    const errorMessage = `Unexpected token "${token.$rawValue}" (${token.$name}) at index ${token.$index}.`

    if (!expectedTokens || expectedTokens.length === 0) {
      super(errorMessage)
    }
    else if (expectedTokens.length === 1 && expectedTokens[0]) {
      super(`${errorMessage} Expected token "${expectedTokens[0].$rawValue}" (${expectedTokens[0].$name}).`)
    }
    else {
      const expectedTokenNames = expectedTokens.map(t => t.$name).join(', ')
      super(`${errorMessage} Expected one of the following tokens: ${expectedTokenNames}.`)
    }

    this.name = 'UnexpectedTokenError'

    this.expectedTokens = expectedTokens
    this.token = token
  }
}
