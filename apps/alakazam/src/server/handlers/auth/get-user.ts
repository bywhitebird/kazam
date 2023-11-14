export const getUser = async ({ github }: {
  github?: {
    id: number
  }
}) => {
  if (github !== undefined) {
    return await database
      .select(database.User, () => ({
        id: true,
        githubConnection: (githubConnection) => ({
          filter_single: database.op(githubConnection.githubId, '=', github.id),
        }),
        limit: 1,
      }))
      .run(database.client)
      .then((users) => users[0] ?? null)
  }

  throw new Error('Not implemented')

  // return await database
  //   .select(database.User, {
  //     name: name,
  //     ...(
  //       github
  //         ? {
  //           githubConnection: database.insert(database.UserGitHubConnection, {
  //             githubUsername: github.login,
  //             githubId: github.id,
  //           })
  //         }
  //         : {}
  //     )
  //   })
  //   .unlessConflict()
  //   .run(database.client)
}
