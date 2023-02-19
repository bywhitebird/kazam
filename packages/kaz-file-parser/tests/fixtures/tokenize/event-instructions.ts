import { EventInstructionToken } from '../../../src/features/event-instruction'
import { EndInstructionToken, StartInstructionToken } from '../../../src/features/instruction'
import type { Token } from '../../../src/lib/voltair'
import { ArrowFunctionBodyToken, ArrowToken, ColonTypeAnnotationToken, CommaToken, IdentifierToken, LeftParenthesisToken, RightParenthesisToken, TypeToken } from '../../../src/shared'

export const eventInstructionsFixtures: ({
  name: string
  input: string
  expectedTokenCheckers: {
    checker: Token
    rawValue?: string
    value?: unknown
  }[]
})[] = [
  {
    name: 'When I use an event instruction with a function, event is correctly tokenized',
    input: `
    - on:ready (e) => {
        console.log(e)
      }
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: EventInstructionToken, rawValue: 'on:ready', value: 'ready' },
      { checker: LeftParenthesisToken, rawValue: '(' },
      { checker: IdentifierToken, value: 'e' },
      { checker: RightParenthesisToken, rawValue: ')' },
      { checker: ArrowToken, rawValue: '=>' },
      { checker: ArrowFunctionBodyToken, value: 'console.log(e)' },
      { checker: EndInstructionToken, rawValue: '' },
    ],
  },
  {
    name: 'When I use an event instruction with an inline function, event is correctly tokenized',
    input: `
    - on:ready (e) => console.log(e)
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: EventInstructionToken, rawValue: 'on:ready', value: 'ready' },
      { checker: LeftParenthesisToken, rawValue: '(' },
      { checker: IdentifierToken, value: 'e' },
      { checker: RightParenthesisToken, rawValue: ')' },
      { checker: ArrowToken, rawValue: '=>' },
      { checker: ArrowFunctionBodyToken, value: 'console.log(e)' },
      { checker: EndInstructionToken, rawValue: '' },
    ],
  },
  {
    name: 'When I use an event instruction with multiple parameters, event is correctly tokenized',
    input: `
    - on:ready (e, foo) => console.log(e, foo)
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: EventInstructionToken, rawValue: 'on:ready', value: 'ready' },
      { checker: LeftParenthesisToken, rawValue: '(' },
      { checker: IdentifierToken, value: 'e' },
      { checker: CommaToken, rawValue: ',' },
      { checker: IdentifierToken, value: 'foo' },
      { checker: RightParenthesisToken, rawValue: ')' },
      { checker: ArrowToken, rawValue: '=>' },
      { checker: ArrowFunctionBodyToken, value: 'console.log(e, foo)' },
      { checker: EndInstructionToken, rawValue: '' },
    ],
  },
  {
    name: 'When I use an event instruction with typed parameters, event is correctly tokenized',
    input: `
    - on:ready (e: Event, foo: string) => console.log(e, foo)
    `,
    expectedTokenCheckers: [
      { checker: StartInstructionToken, rawValue: '-' },
      { checker: EventInstructionToken, rawValue: 'on:ready', value: 'ready' },
      { checker: LeftParenthesisToken, rawValue: '(' },
      { checker: IdentifierToken, value: 'e' },
      { checker: ColonTypeAnnotationToken, rawValue: ':' },
      { checker: TypeToken, value: 'Event' },
      { checker: CommaToken, rawValue: ',' },
      { checker: IdentifierToken, value: 'foo' },
      { checker: ColonTypeAnnotationToken, rawValue: ':' },
      { checker: TypeToken, value: 'string' },
      { checker: RightParenthesisToken, rawValue: ')' },
      { checker: ArrowToken, rawValue: '=>' },
      { checker: ArrowFunctionBodyToken, value: 'console.log(e, foo)' },
      { checker: EndInstructionToken, rawValue: '' },
    ],
  },
]
