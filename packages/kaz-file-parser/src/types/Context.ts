import type { Token } from './Token'

export interface Context<Name extends string = string> {
  $name: Name
  breakingPatterns?: RegExp[] | undefined
  forbiddenTokens?: Token[]
}
