import * as Contexts from '../../contexts'
import type { Token } from '../../types/Token'
import { createToken } from '../utils/create-token'

const instructionContexts = Object.values(Contexts).filter(context => context.$name.includes('Instruction'))

export const EndInstructionToken: Token<'EndInstructionToken'> = createToken({
  $name: 'EndInstructionToken',
  $rawValue: '',
  $index: 0,
  pattern: /^\n\s*$/,
  inContexts: instructionContexts,
  endContexts: instructionContexts,
})

export const isEndInstructionToken = (token: Token): token is typeof EndInstructionToken => token.$name === EndInstructionToken.$name
