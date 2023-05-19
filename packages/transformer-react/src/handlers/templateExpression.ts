import type { IHandler } from '../transformer-react'

export const handleTemplateExpression: IHandler<'templateExpression'> = async (templateExpression) => {
  return `{${templateExpression.expression.$value}}`
}
