declare module '#auth-utils' {
  interface UserSession {
    loggedInAt: number
    user: (
      | {
        provider: 'github'
        token: string
        id: number
        login: string
        name: string
        avatarUrl: string
      }
    )
  }
}
