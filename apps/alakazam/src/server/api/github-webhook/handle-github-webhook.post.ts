import * as valibot from "valibot"

import { updateComponents } from "~/server/handlers/component-generation/update-components"

export default defineEventHandler(async (event) => {
  const githubEventName = event.headers.get("X-GitHub-Event")

  switch (githubEventName) {
    case "push": {
      const body = await readBody(event)
      const parsedBody = valibot.parse(valibot.object({
        repository: valibot.object({
          id: valibot.string(),
          full_name: valibot.string(),
          html_url: valibot.string(),
        }),
      }), body)

      return await updateComponents({
        repository: {
          id: parsedBody.repository.id,
          name: parsedBody.repository.full_name,
          url: parsedBody.repository.html_url,
        },
      })
    }
    case "ping": {
      return "pong"
    }
    default: {
      throw createError({
        statusCode: 400,
        statusMessage: `Invalid GitHub event: ${githubEventName}`
      })
    }
  }
})
