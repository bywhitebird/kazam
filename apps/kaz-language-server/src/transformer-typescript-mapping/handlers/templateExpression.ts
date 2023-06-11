import type { IHandler } from '../transformer-typescript-mapping'

export const handleTemplateExpression: IHandler<'templateExpression'> = async (templateExpression, { addGeneratedContent }) => {
  addGeneratedContent('(() => {\n')
  addGeneratedContent(templateExpression.expression)
  addGeneratedContent('});\n')
}
