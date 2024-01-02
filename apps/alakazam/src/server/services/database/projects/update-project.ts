export const dbUpdateProject = wrapDatabaseRequest(
  (
    id: string,
    update: {
      name?: string
      repositories?: { url: string, rootDir?: string }[]
    }
  ) =>
    db.update(db.projects.Project, (dbProject) => ({
      filter: db.op(dbProject.id, '=', db.uuid(id)),
      set: {
        name: update.name,
        sources: update.repositories && db.for(
          db.set(
            ...update.repositories.map((repository) => db.tuple({
              url: repository.url,
              rootDir: repository.rootDir ?? 0,
              __tsRootDir: '', // __tsRootDir is only used for type assertions
            })),
          ),
          (repository) =>
            db
              .insert(db.projects.GitHubRepository, {
                url: repository.url,
                ...repository.rootDir.__element__.__name__ === 'std::str' && {
                  rootDir: repository.rootDir as typeof repository.__tsRootDir,
                },
              })
              // TODO: Handle conflicts
              // .unlessConflict((dbGitHubRepository) => ({
              //   on: db.tuple([dbGitHubRepository.url, dbGitHubRepository.rootDir, dbGitHubRepository.project.id]),
              //   else: dbGitHubRepository,
              // }))
        ),
      },
    }))
)
