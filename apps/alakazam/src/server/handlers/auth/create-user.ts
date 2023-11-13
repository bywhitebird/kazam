export const createUser = async (name: string, { github }: {
  github?: {
    id: number
    login: string
  }
}) => {
  await database
    .insert(database.User, {
      name: name,
      ...(
        github
          ? {
            githubConnection: database.insert(database.UserGitHubConnection, {
              githubUsername: github.login,
              githubId: github.id,
            })
          }
          : {}
      )
    })
    .unlessConflict()
    .run(database.client)
}
