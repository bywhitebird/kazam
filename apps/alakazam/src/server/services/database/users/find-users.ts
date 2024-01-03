export const dbFindUserById = wrapDatabaseRequest(
  (id: string) =>
    db.select(db.users.User, (dbUser) => ({
      id: true,
      filter_single: db.op(dbUser.id, '=', db.uuid(id)),
    }))
)

export const dbFindUserByGitHubId = wrapDatabaseRequest(
  (githubId: number) =>
    db.select(db.users.User, () => ({
      id: true,
      identities: (identity) => ({
        filter_single: db.op(identity.is(db.users.GitHubIdentity).githubId, '=', githubId),
      }),
      limit: 1,
    })).assert_single()
)
