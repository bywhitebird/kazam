import { createUser } from "~/server/handlers/auth/create-user"
import { getUser } from "~/server/handlers/auth/get-user"

export default oauth.githubEventHandler({
  config: {
    scope: ['repo'],
  },
  async onSuccess(event, data) {
    const createdSession = {
      user: {
        provider: 'github',
        token: data.tokens.access_token,
        githubId: data.user.id,
        login: data.user.login,
        name: data.user.name,
        avatarUrl: data.user.avatar_url,
      },
      loggedInAt: Date.now(),
    } as const

    let user: { id: string } | null = await getUser({ github: { id: createdSession.user.githubId } })

    if (user === null) {
      user = await createUser(createdSession.user.name, {
        github: {
          id: createdSession.user.githubId,
          login: createdSession.user.login,
        }
      })
    }

    if (user === null) {
      throw new Error('Failed to get or create user')
    }

    await setUserSession(event, {
      ...createdSession,
      user: { ...createdSession.user, id: user.id }
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