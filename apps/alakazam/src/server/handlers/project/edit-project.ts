import { getProject } from "./get-project"

export const editProject = async (
  { userId, projectId, projectName, repositoryUrl }:
    { userId: string, projectId: string, projectName?: string, repositoryUrl?: string },
) => {
  if (await getProject({ userId, projectId }) === null) {
    throw new Error('User is not a member of the organization')
  }

  return database
    .update(
      database.Project,
      (databaseProject) => ({
        filter: database.op(databaseProject.id, '=', database.uuid(projectId)),
        set: {
          ...(projectName !== undefined ? { name: projectName } : {}),
          ...(repositoryUrl !== undefined ? {
            sources: {
              '+=': database.insert(
                database.ProjectSource,
                {
                  githubRepository: database.insert(
                    database.GitHubRepository,
                    {
                      url: repositoryUrl,
                    },
                  ),
                },
              )
            }
          } : {}),
        },
      }),
    )
    .run(database.client)
}
