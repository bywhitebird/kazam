export const dbFindProjectById = wrapDatabaseRequest(
  (id: string) =>
    db.select(db.projects.Project, (dbProject) => ({
      id: true,
      name: true,
      filter_single: db.op(dbProject.id, '=', db.uuid(id)),

      // TODO: We may not want to include all relations here because it may
      // cause performance issues.
      sources: () => ({
        ...db.is(db.projects.GitHubRepository, {
          rootDir: true,
          url: true,
          _type: true,
        }),
      }),
    }))
)

export const dbFindOrganizationProjects = wrapDatabaseRequest(
  (organizationId: string) =>
    db.select(db.projects.Project, (dbProject) => ({
      id: true,
      name: true,
      filter: db.op(dbProject.organization.id, '=', db.uuid(organizationId)),
    }))
)

export const dbFindProjectsByGitHubRepositoryUrl = wrapDatabaseRequest(
  (url: string) =>
    db.select(db.projects.Project, () => ({
      sources: (dbSources) => ({
        filter: db.op(dbSources.is(db.projects.GitHubRepository).url, '=', url),
      }),

      id: true,
      organization: {
        users: { id: true },
      },
      parsers: {
        parserName: true,
        parserParameters: true,
      },
      transformers: {
        transformerName: true,
        transformerParameters: true,
      },
    }))
)
