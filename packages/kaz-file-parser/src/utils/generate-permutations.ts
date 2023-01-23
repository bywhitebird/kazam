export const generatePermutations = <T>(collection: T[], k: number = collection.length): T[][] => {
  const combinations: T[][] = []

  for (let i = 0; i < collection.length; i++) {
    const rest = collection.filter((_, index) => index !== i)
    const restCombinations = generatePermutations(rest, k - 1)
    const element = collection[i]

    if (element === undefined)
      continue

    if (restCombinations.length === 0)
      combinations.push([element])
    else
      combinations.push(...restCombinations.map(combination => [element, ...combination]))
  }

  return combinations
}
