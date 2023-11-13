import { UserSession } from "#auth-utils"
import { createUser } from "~/server/handlers/auth/create-user"

export default oauth.githubEventHandler({
  config: {
    scope: ['repo'],
  },
  async onSuccess(event, data) {
    const createdSession: UserSession = {
      user: {
        provider: 'github',
        token: data.tokens.access_token,
        id: data.user.id,
        login: data.user.login,
        name: data.user.name,
        avatarUrl: data.user.avatar_url,
      },
      loggedInAt: Date.now(),
    }

    await setUserSession(event, createdSession)
    await createUser(createdSession.user.name, {
      github: {
        id: createdSession.user.id,
        login: createdSession.user.login,
      }
    })

    setResponseHeaders(event, { 'content-type': 'text/html' })
    return `
      <script>
        window.opener.postMessage({
          type: 'auth',
          status: 'success',
          provider: 'github',
        })
        window.close()
      </script>
    ` as never as void
  }
})