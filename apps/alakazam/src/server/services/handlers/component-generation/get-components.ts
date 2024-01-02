import { dbFindProjectById } from "../../database/projects/find-projects"
import { findParsersByNames } from "./find-parsers"
import { findTransformersByNames } from "./find-transformers"
import { compileFiles } from "./compile-files"
import { getUncompiledFiles } from "./get-uncompiled-files"

export const getProjectComponents = async (
  { userId, githubToken, installationId, projectId, parsers, transformers }:
    {
      userId: string,
      projectId: string,
      parsers: Awaited<ReturnType<typeof findParsersByNames>>,
      transformers: Awaited<ReturnType<typeof findTransformersByNames>>,
    } & (
      { githubToken: string, installationId?: never } |
      { githubToken?: never, installationId: string }
    ),
) => {
  const extensions = parsers?.map(Parser => new Parser().metadata.extension)

  const project = await dbFindProjectById(projectId, {
    options: {
      auth: { userId },
    },
  })

  if (project === null) {
    throw new Error('Project not found')
  }

  const uncompiledFiles = await getUncompiledFiles({
    project,
    extensions,
    ...(githubToken ? { githubToken } : installationId ? { installationId } : { githubToken: 'NEVER REACHED, ONLY FOR TYPING' }),
  })

  const compiledFiles = await compileFiles({
    folders: [uncompiledFiles],
    parsers,
    transformers,
  })

  return compiledFiles
}
