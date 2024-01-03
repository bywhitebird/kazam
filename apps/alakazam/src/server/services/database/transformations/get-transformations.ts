export const dbGetTransformationsByProject = wrapDatabaseRequest(
  (projectId: string) =>
    db.select(
      db.transformations.TransformationFolder,
      (dbTransformationFolder) => ({
        id: true,
        date: true,
        transformer: {
          transformerName: true,
        },
        transformations: {
          path: true,
          content: true,
        },
        filter: db.op(
          dbTransformationFolder.project.id,
          '=',
          db.uuid(projectId)
        ),
      })
    )
)
