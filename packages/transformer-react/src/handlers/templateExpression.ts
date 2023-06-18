import type { IHandler } from '../transformer-react'

export const handleTemplateExpression: IHandler<'templateExpression'> = async (templateExpression, { transformExpression }) => {
  return `{${await transformExpression(templateExpression.expression)}}`
}
