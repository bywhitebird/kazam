import { dbFindProjectById } from "../../database/projects/find-projects"
import { appOctokit, getOctokit } from "../../external-apis/github/octokit" // TODO

export const getUncompiledFiles = async ({
  project,
  extensions,
  githubToken,
  installationId,
}: {
  project: NonNullable<Awaited<ReturnType<typeof dbFindProjectById>>>
  extensions: string[]
} & (
  { githubToken: string, installationId?: never } |
  { githubToken?: never, installationId: string }
)) => {
  const octokit = githubToken ? getOctokit(githubToken) : await appOctokit.getInstallationOctokit(Number(installationId))

  const uncompiledFolders: { path: string, content: string }[] = []

  for (const source of project.sources) {
    const currentSourceUncompiledFiles: { path: string, content: string }[] = []

    if (source._type === 'GitHubRepository' && source.url !== null) {
      const githubRepositoryRegexp = /^https:\/\/github\.com\/(?<owner>[^/]+)\/(?<repo>[^/]+)(?:\/(?<path>.*))?$/
      const match = source.url.match(githubRepositoryRegexp)
      const { owner, repo } = match?.groups ?? {}

      const { data: { tree } } = await octokit.git.getTree({
        owner,
        repo,
        tree_sha: 'HEAD',
        recursive: 'true',
      })

      for (const { path, type, sha } of tree) {
        if (path === undefined || sha === undefined) {
          continue
        }

        if (type !== 'blob') {
          continue
        }

        if (
          source.rootDir &&
          !path.startsWith(source.rootDir.replace(/^\//, '')) &&
          extensions.some(extension => path.endsWith(extension))
        ) {
          continue
        }

        const { data: { content } } = await octokit.git.getBlob({
          owner,
          repo,
          file_sha: sha,
        })

        currentSourceUncompiledFiles.push({ path, content })
      }

      uncompiledFolders.push(...currentSourceUncompiledFiles)
    }
  }

  return uncompiledFolders
}
