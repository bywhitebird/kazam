import type { IHandler } from '../transformer-react'

export const handleTemplateExpression: IHandler<'templateExpression'> = (templateExpression, { transformExpression }) => {
  return `{${transformExpression(templateExpression.expression)}}`
}
