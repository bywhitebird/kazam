export const findParent = (node: HTMLElement, selector: string) => {
  while (node) {
    if (node.matches(selector))
      return node

    const parent = node.parentElement
    if (parent === null)
      return null

    node = parent
  }

  return null
}
