import { ReadableStream } from 'node:stream/web'

export const InputStream = (input: string) => {
  const stream = new ReadableStream({
    start(controller) {
      for (const char of input)
        controller.enqueue(char)

      controller.close()
    },
  })

  return stream
}
