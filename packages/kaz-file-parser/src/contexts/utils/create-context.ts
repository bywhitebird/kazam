import type { Context } from '../../types/Context'

export const createContext = <Name extends string = string>(context: Context<Name>): Context<Name> => context
