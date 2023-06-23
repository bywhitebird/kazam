import type { IHandler } from '../transformer-typescript'

export const handleTemplateIf: IHandler<'templateIf'> = async (templateIf, { handle, addGeneratedContent }) => {
  addGeneratedContent('if (')
  addGeneratedContent(templateIf.condition)
  addGeneratedContent(') {\n')
  templateIf.children.forEach(handle)
  addGeneratedContent('}\n')

  if (templateIf.else !== undefined)
    handle(templateIf.else)
}
