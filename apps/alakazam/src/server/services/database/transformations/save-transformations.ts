import { dbFindProjectById } from "../projects/find-projects"
import { dbFindTransformerByName } from "./find-transformer"

export const dbSaveTransformations = wrapDatabaseRequest(
  (transformations: {
    date: Date
    transformations: {
      path: string
      content: string
    }[]
    transformer: typeof db.transformations.TransformerName.__values__[number]
    projectId: string
  }) => {
    const folder = db.insert(
      db.transformations.TransformationFolder,
      {
        date: transformations.date,
        project: dbFindProjectById(transformations.projectId),
        transformer: dbFindTransformerByName(transformations.transformer),
      }
    )

    return db.with(
      [folder],
      db.for(
        db.set(
          ...transformations.transformations.map((transformation) => db.tuple({
            path: transformation.path,
            content: transformation.content,
          })),
        ),
        (component) =>
          db.insert(db.transformations.Transformation, {
            content: component.content,
            path: component.path,
            folder: folder,
          })
      )
    )
  }
)
