export const upperFirst = <T extends string>(str: T): TUppercaseFirst<T> => ((str[0] ?? '').toUpperCase() + str.slice(1)) as TUppercaseFirst<T>
export type TUppercaseFirst<T extends string> = T extends `${infer U}${infer V}` ? `${Uppercase<U>}${V}` : T
