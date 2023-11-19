import { Octokit } from "@octokit/rest"
import type { getProjectParsersAndTransformers } from "./get-parsers-and-transformers"
import { getProject } from "../project/get-project"

export const getProjectComponents = async (
  { userId, projectId, parsers }:
    {
      userId: string,
      projectId: string,
      parsers: Awaited<ReturnType<typeof getProjectParsersAndTransformers>>['parsers'],
    },
) => {
  const extensions = parsers?.map(parser => parser.metadata.extension)

  const project = await getProject({ userId, projectId })

  if (project === null) {
    throw new Error('Project not found')
  }

  project.sources ??= []

  if (project.sources.length > 1) {
    throw new Error('Multiple sources not supported')
  }

  const { githubRepository: repository } = project.sources[0]

  if (repository === null) {
    throw new Error('Repository not found')
  }

  const octokit = new Octokit({})

  const githubRepositoryRegexp = /^https:\/\/github\.com\/(?<owner>[^/]+)\/(?<repo>[^/]+)(?:\/(?<path>.*))?$/
  const match = repository.url.match(githubRepositoryRegexp)
  const { owner, repo } = match?.groups ?? {}

  const { data: { tree } } = await octokit.git.getTree({
    owner,
    repo,
    tree_sha: 'HEAD',
    recursive: 'true',
  })

  const components = await Promise.all(tree.map(async ({ path, type, sha }) => {
    if (path === undefined || sha === undefined) {
      return
    }

    if (type !== 'blob') {
      return
    }

    if (!extensions?.some(extension => path.endsWith(extension))) {
      return
    }

    if (!path.startsWith(repository.rootDir.replace(/^\//, ''))) {
      return
    }

    const { data: { content } } = await octokit.git.getBlob({
      owner,
      repo,
      file_sha: sha,
    })

    const contentString = Buffer.from(content, 'base64').toString()

    return {
      path,
      content: contentString,
    }
  })).then(components => components.filter(Boolean))

  return {
    components,
  }
}
