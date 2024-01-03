export const dbGetTransformation = wrapDatabaseRequest(
  ({ projectId, transformerName, path }: {
    projectId: string
    transformerName: typeof db.transformations.TransformerName.__values__[number]
    path: string
  }) =>
    db.select(
      db.transformations.Transformation,
      (dbTransformation) => ({
        content: true,
        filter_single: db.op(
          db.op(
            db.op(
              dbTransformation.folder.project.id,
              '=',
              db.uuid(projectId)
            ),
            'and',
            db.op(
              dbTransformation.folder.transformer.transformerName,
              '=',
              db.transformations.TransformerName[transformerName],
            ),
          ),
          'and',
          db.op(
            dbTransformation.path,
            '=',
            path,
          ),
        ),
      })
    )
)
