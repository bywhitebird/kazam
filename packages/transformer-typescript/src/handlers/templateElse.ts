import type { IHandler } from '../transformer-typescript'

export const handleTemplateElse: IHandler<'templateElse'> = async (templateElse, { handle, addGeneratedContent }) => {
  addGeneratedContent('else {\n')
  templateElse.children.forEach(handle)
  addGeneratedContent('}\n')
}
