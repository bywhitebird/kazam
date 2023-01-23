import type { Token } from '../../types/Token'

export const createToken = <Name extends string = string>(token: Token<Name>): Token<Name> => token
