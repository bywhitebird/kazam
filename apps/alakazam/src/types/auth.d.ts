declare module '#auth-utils' {
  interface UserSession {
    loggedInAt: number
    user: (
      | {
        provider: 'github'
        token: string
        githubId: number
        id: string
        login: string
        name: string
        avatarUrl: string
      }
    )
  }
}
