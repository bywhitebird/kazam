import { parse, tokenize } from '@whitebird/kaz-ast'
import { TransformerReact } from '@whitebird/kazam-transformer-react'
import prettier from 'prettier'
import zod from 'zod'

const getQuerySchema = zod.object({
  code: zod.string(),
  type: zod.enum(['ast', 'react']),
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

  if (type === 'ast') {
    const tokens = tokenize(code)
    const ast = parse(tokens)
    const result = ast instanceof Error ? ast : JSON.stringify(ast)

    return new Response(result, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  else if (type === 'react') {
    const tokens = tokenize(code)
    const ast = parse(tokens)

    if (ast instanceof Error) {
      return new Response(ast, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    const componentName = 'YourComponent'
    const transformer = new TransformerReact({ [componentName]: ast }, {})
    const result = await transformer.transform()

    if (!(`components/${componentName}.tsx` in result) || !(result[`components/${componentName}.tsx`] instanceof Blob)) {
      return new Response(null, {
        status: 500,
        statusText: 'Internal server error',
      })
    }

    const component = prettier.format(await result[`components/${componentName}.tsx`].text(), {
      parser: 'typescript',
      singleQuote: true,
      trailingComma: 'all',
    })
    // const component = await result[`components/${componentName}.tsx`].text()

    return new Response(component, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  else {
    return new Response(null, {
      status: 400,
      statusText: 'Bad request',
    })
  }
}
