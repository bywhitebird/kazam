import type { IHandler } from '../transformer-typescript'

export const handleTemplateFor: IHandler<'templateFor'> = (templateFor, { handle, addGeneratedContent }) => {
  addGeneratedContent('for (')
  addGeneratedContent(templateFor.parameters)
  addGeneratedContent(') {\n')
  templateFor.children.forEach(handle)
  addGeneratedContent('}\n')
}
