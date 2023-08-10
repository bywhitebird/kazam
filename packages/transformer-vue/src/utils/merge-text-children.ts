import type { KazTemplateTag } from "@whitebird/kaz-ast";

export const mergeTextChildren = (children: NonNullable<KazTemplateTag['children']>) => {
  const mergedChildren: typeof children = []
  for (const child of children) {
    const lastChild = mergedChildren.at(-1)

    if (lastChild?.$type === 'Text' && child.$type === 'Text') {
      lastChild.text.$value = `${lastChild.text.$value} ${child.text.$value}`
    } else {
      mergedChildren.push(child)
    }
  }
  return mergedChildren
}
