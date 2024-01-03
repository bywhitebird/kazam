import { dbCreateUserWithGitHub } from "../../database/users/create-users"

export const createUser = async (
  user: {
    username: string
  },
  { github }: {
    github?: {
      id: number
      login: string
    }
  },
) => {
  if (github !== undefined) {
    return await dbCreateUserWithGitHub({
      username: user.username,
    }, {
      githubId: github.id,
      githubUsername: github.login,
    })
  }

  throw new Error('Not implemented')
}
