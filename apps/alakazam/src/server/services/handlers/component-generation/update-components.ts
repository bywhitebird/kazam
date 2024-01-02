import { dbFindProjectsByGitHubRepositoryUrl } from "../../database/projects/find-projects"
import { findParsersByNames } from "./find-parsers"
import { findTransformersByNames } from "./find-transformers"
import { getProjectComponents } from "./get-components"
import { dbSaveTransformations } from "../../database/transformations/save-transformations"

export const updateComponents = async (params: {
  repository: {
    id: string
    name: string
    url: string
  },
  installationId: string
}) => {
  const projects = await dbFindProjectsByGitHubRepositoryUrl(params.repository.url)

  await Promise.all(projects.map(async (project) => {
    const parsers = findParsersByNames(project.parsers.map(({ parserName }) => parserName))
    const transformers = findTransformersByNames(project.transformers.map(({ transformerName }) => transformerName))

    console.log({
      parsers, transformers, project
    })

    await updateComponentsForProject({
      projectId: project.id,
      userId: project.organization.users[0].id,
      parsers,
      transformers,
      installationId: params.installationId,
    })
  }))
}

const updateComponentsForProject = async (
  { projectId, userId, parsers, transformers, installationId }: {
    projectId: string
    userId: string 
    parsers: Awaited<ReturnType<typeof findParsersByNames>>
    transformers: Awaited<ReturnType<typeof findTransformersByNames>>
    installationId: string
  },
) => {
  const components = await getProjectComponents({
    userId,
    projectId,
    parsers,
    transformers,
    installationId,
  })

  await Promise.all(
    (Object.keys(components) as (keyof typeof components)[]).map(async (transformerName) => {
      const generatedComponents = components[transformerName]

      if (generatedComponents === undefined) {
        return
      }

      await dbSaveTransformations({
        date: new Date(),
        transformations: generatedComponents.map(({ filePath, content }) => ({ path: filePath, content })),
        transformer: transformerName,
        projectId,
      })
    })
  )
}
