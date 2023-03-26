import { parse, tokenize } from '@whitebird/kaz-file-parser'
import zod from 'zod'

const getQuerySchema = zod.object({
  code: zod.string(),
  type: zod.enum(['ast']),
})

export async function get({ request }: { request: Request }) {
  const url = new URL(request.url)
  const params = getQuerySchema.safeParse(Object.fromEntries(url.searchParams.entries()))

  if (!params.success) {
    return new Response(null, {
      status: 400,
      statusText: 'Bad request',
    })
  }

  const { code, type } = params.data

  switch (type) {
    case 'ast':
      // eslint-disable-next-line no-case-declarations
      const tokens = await tokenize(code)
      // eslint-disable-next-line no-case-declarations
      const ast = parse(tokens)
      // eslint-disable-next-line no-case-declarations
      const result = ast instanceof Error ? ast.message : JSON.stringify(ast)

      return new Response(result, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    default:
      return new Response(null, {
        status: 400,
        statusText: 'Bad request',
      })
  }
}
