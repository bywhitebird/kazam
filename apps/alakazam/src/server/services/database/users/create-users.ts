export const dbCreateUserWithGitHub = wrapDatabaseRequest(
  (
    user: { username: string },
    github: { githubId: number, githubUsername: string },
  ) => 
    db.insert(db.users.User, {
      name: user.username,
      identities: dbCreateGitHubIdentity(github),
    })
)

export const dbCreateGitHubIdentity = wrapDatabaseRequest(
  (github: { githubId: number, githubUsername: string }) =>
    db.insert(db.users.GitHubIdentity, {
      githubUsername: github.githubUsername,
      githubId: github.githubId,
    })
)
