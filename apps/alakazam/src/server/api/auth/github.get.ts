export default oauth.githubEventHandler({
  config: {
    scope: ['repo'],
  },
  async onSuccess(event, data) {
    await setUserSession(event, {
      user: {
        provider: 'github',
        token: data.tokens.access_token,
        id: data.user.id,
        login: data.user.login,
        name: data.user.name,
        avatarUrl: data.user.avatar_url,
      },
      loggedInAt: Date.now(),
    })

    setResponseHeaders(event, {
      'content-type': 'text/html',
    })
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