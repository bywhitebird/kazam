import { dbFindUserByGitHubId } from "../../database/users/find-users"

export const getUser = async (
  { github }: {
    github?: { id: number }
  },
) => {
  if (github !== undefined) {
    return dbFindUserByGitHubId(github.id)
  }

  throw new Error('Not implemented')
}
