import * as path from "node:path"
import * as fs from "node:fs/promises"
import * as kazam from "kazam"
import tmp from "tmp-promise"
import { getProjectComponents } from "./get-components"
import { getProjectParsersAndTransformers } from "./get-parsers-and-transformers"

export const updateComponents = async (params: {
  repository: {
    id: string
    name: string
    url: string
  }
}) => {
  const projects = await database
    .select(
      database.Project,
      (databaseProject) => ({
        filter: database.op(databaseProject.sources.githubRepository.url, '=', params.repository.url),
        id: true,
        organization: {
          members: { user: { id: true } },
        },
      }),
    )
    .run(database.client)

  await Promise.all(projects.map(async (project) => {
    if (project.organization?.members[0].user.id === undefined) {
      return
    }

    await updateComponentsForProject({
      projectId: project.id,
      userId: project.organization.members[0].user.id,
    })
  }))
}

const updateComponentsForProject = async (
  { projectId, userId }: { projectId: string, userId: string },
) => {
  const { parsers, transformers } = await getProjectParsersAndTransformers(projectId)
  const { components } = await getProjectComponents({
    userId,
    projectId,
    parsers,
  })

  const { path: directory, cleanup: cleanupDirectory } = await tmp.dir({
    unsafeCleanup: true,
  })

  await Promise.all(components.map(async (component) => {
    const filePath = path.join(directory, component.path)
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, component.content)
  }))

  const generatedComponents = await kazam.generate({
    input: components.map(({ path: componentPath }) => path.join(directory, componentPath)),
    output: directory,
    parsers: parsers?.map(({ Parser }) => Parser) ?? [],
    transformers: transformers?.map(({ Transformer }) => Transformer) ?? [],
    rootDir: directory,
  }).then(mergeGeneratedComponents)
  
  const insertedFiles = await database.params({ components: database.json }, (params) => {
    return database.update(
      database.Project,
      (databaseProject) => ({
        filter: database.op(databaseProject.id, '=', database.uuid(projectId)),
        set: {
          generatedComponents: database.for(database.json_array_unpack(params.components), (component) => {
            return database.insert(database.File, {
              content: database.cast(database.str, component.content),
              path: database.cast(database.str, component.filePath),
            });
          }),
        },
      }),
    )
  }).run(database.client, { components: generatedComponents })

  await cleanupDirectory()

  return { insertedFiles }
}

const mergeGeneratedComponents = async (
  components: Awaited<ReturnType<typeof kazam.generate>>,
) => {
  return components.flatMap((components) => {
    return Array.from(components.values())
  })
}
