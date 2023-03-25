import { server$ } from "@tanstack/bling/server"
import { useEffect, useState } from "react"

import { parse, tokenize } from "@whitebird/kaz-file-parser"
import { ExpectedTokenError, UnexpectedTokenError } from "@whitebird/kaz-file-parser/dist/lib/voltair/utils/errors"

export class ServerError extends Error {
  status: number;
  constructor(message: string, { status, stack }: { status?: number; stack?: string } = {}) {
    super(message);
    this.name = "ServerError";
    this.status = status || 400
    if (stack) {
      this.stack = stack;
    }
  }
}

const runParseToAst = server$(async (code: string) => {
  const tokens = await tokenize(code)
  const ast = await parse(tokens)

  if (ast instanceof ExpectedTokenError || ast instanceof UnexpectedTokenError) {
    return ast.message
  }

  return ast
})

export const AstOutput = ({ code }: { code: string }) => {
  const [output, setOutput] = useState<unknown>()
  const [loading, setLoading] = useState(false)
  const [outputTimeout, setOutputTimeout] = useState<NodeJS.Timeout>()

  useEffect(() => {
    setLoading(true)
    if (outputTimeout) {
      clearTimeout(outputTimeout)
    }

    setOutputTimeout(setTimeout(async () => {
      try {
        const output = await runParseToAst(code)
        setOutput(output)
      } catch (error) {
        if (error instanceof ServerError) {
          setOutput(error.message)
        } else {
          setOutput(error)
        }
      } finally {
        setLoading(false)
      }
    }, 500))
  }, [code])

  return <div className="overflow-auto bg-gray-1000 pb-2 h-[100%]">
    <pre className="px-6 mt-2 font-mono text-sm text-gray-100 w-[100%] h-[100%] selection:bg-blue-code-selection">
      {
        loading
          ? "Loading..."
          : typeof output === "string"
            ? output
            : JSON.stringify(output, null, 2)
      }
    </pre>
  </div>
}
