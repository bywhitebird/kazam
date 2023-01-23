import type { Context } from './Context'

export interface Token<Name extends string = string> {
  $name: Name
  $rawValue: string
  $index: number
  pattern: RegExp
  singleCharacter?: boolean
  ignore?: boolean
  startContexts?: Context[]
  endContexts?: Context[]
  inContexts?: Context[]
}
