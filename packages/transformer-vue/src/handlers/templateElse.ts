import type { IHandler } from '../transformer-vue'

export const handleTemplateElse: IHandler<'templateElse'> = async (templateElse, { handle }) => {
  return `[${await Promise.all(templateElse.children.map(handle)).then(children => children.join(',\n'))}]`
}
