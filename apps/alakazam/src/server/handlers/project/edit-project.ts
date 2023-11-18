import { GitHubRepository } from "~~/dbschema/edgeql-js/modules/default"
import { addWebhookToRepository } from "../repository/add-webhook-to-repository"
import { getProject } from "./get-project"

export const editProject = async (
  { user, project, repository, webhook, githubAccessToken }: {
    user: { id: string }
    project: { id: string, name?: string }
  } & (
    {
      webhook?: never
      githubAccessToken?: never
      repository?: never
    }
    | {
      webhook?: Parameters<typeof addWebhookToRepository>[1]['webhook']
      githubAccessToken: string
      repository: {
        url: string
        rootDir?: string
      }
    }
  ),
) => {
  if (await getProject({ userId: user.id, projectId: project.id }) === null) {
    throw new Error('User is not a member of the organization')
  }

  let updateDatabasePromise = database
    .update(
      database.Project,
      (databaseProject) => ({
        filter: database.op(databaseProject.id, '=', database.uuid(project.id)),
        set: {
          ...project.name !== undefined && { name: project.name },
          ...repository !== undefined && {
            sources: {
              '+=': database.insert(
                database.ProjectSource,
                {
                  githubRepository: database.insert(
                    database.GitHubRepository,
                    {
                      url: repository.url,
                    },
                  ),
                },
              )
            }
          },
        },
      }),
    )
    .run(database.client)
    .then(async (data) => {
      if (repository === undefined) {
        return data
      }

      await database.update(
        GitHubRepository,
        (databaseGitHubRepository) => ({
          filter: database.op(
            database.op(databaseGitHubRepository.projectSource.project.id, '=', database.uuid(project.id)),
            'and',
            database.op(databaseGitHubRepository.url, '=', repository.url),
          ),
          set: {
            ...repository.rootDir !== undefined && { rootDir: repository.rootDir },
          },
        }),
      ).run(database.client)

      return data
    })

  if (webhook !== undefined && repository !== undefined) {
    updateDatabasePromise = updateDatabasePromise.then(async (d) => {
      await addWebhookToRepository(githubAccessToken, {
        repository: { url: repository.url },
        webhook,
      })

      return d
    })
  }

  return updateDatabasePromise
}
