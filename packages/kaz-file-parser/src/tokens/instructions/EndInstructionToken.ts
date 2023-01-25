import { type Token, createToken } from '../../classes/Token'
import * as Contexts from '../../contexts'

const instructionContexts = Object.values(Contexts).filter(context => context.$name.includes('Instruction'))

export const EndInstructionToken: Token<'EndInstructionToken'> = createToken({
  $name: 'EndInstructionToken',
  pattern: /^\n\s*$/,
  inContexts: instructionContexts,
  endContexts: instructionContexts,
})

export const isEndInstructionToken = (token: Token): token is typeof EndInstructionToken => token.$name === EndInstructionToken.$name
