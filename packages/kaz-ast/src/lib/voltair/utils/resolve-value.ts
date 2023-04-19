export const resolveValue = <T>(value: T | (() => T)): T => {
  if (typeof value === 'function')
    return (value as () => T)()

  return value
}
