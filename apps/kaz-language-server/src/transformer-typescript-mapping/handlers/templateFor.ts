import type { IHandler } from '../transformer-typescript-mapping'

export const handleTemplateFor: IHandler<'templateFor'> = async (templateFor, { handle, addGeneratedContent }) => {
  addGeneratedContent('for (')
  addGeneratedContent(templateFor.parameters)
  addGeneratedContent(') {\n')
  templateFor.children.forEach(handle)
  addGeneratedContent('}\n')
}
