import { Context } from '../../../lib/voltair'

export const TemplateContext = new Context({
  $name: 'TemplateContext',
  breakingPatterns: [/\s+/],
})
