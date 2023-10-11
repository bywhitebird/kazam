import type { IHandler } from '../transformer-typescript'

export const handleTemplateExpression: IHandler<'templateExpression'> = (templateExpression, { addGeneratedContent }) => {
  addGeneratedContent('(() => {\n')
  addGeneratedContent(templateExpression.expression)
  addGeneratedContent('});\n')
}
