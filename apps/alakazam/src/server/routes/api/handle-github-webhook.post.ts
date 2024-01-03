import * as valibot from "valibot"

import { updateComponents } from "~/server/services/handlers/component-generation/update-components"

export default defineEventHandler(async (event) => {
  const githubEventName = event.headers.get("X-GitHub-Event")

  switch (githubEventName) {
    case "push": {
      const body = await parseBody(event, valibot.object({
        repository: valibot.object({
          id: valibot.number(),
          full_name: valibot.string(),
          html_url: valibot.string(),
        }),
        installation: valibot.object({
          id: valibot.number(),
        }),
      }))

      return await updateComponents({
        repository: {
          id: body.repository.id.toString(),
          name: body.repository.full_name,
          url: body.repository.html_url,
        },
        installationId: body.installation.id.toString(),
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
