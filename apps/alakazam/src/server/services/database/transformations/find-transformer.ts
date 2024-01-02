export const dbFindTransformerByName = wrapDatabaseRequest(
  (name: typeof db.transformations.TransformerName.__values__[number]) =>
    db.select(db.transformations.Transformer, (dbTransformer) => ({
      id: true,
      filter_single: db.op(dbTransformer.transformerName, '=', db.transformations.TransformerName[name]),
    }))
)
