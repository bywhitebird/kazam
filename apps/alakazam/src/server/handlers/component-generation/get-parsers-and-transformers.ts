import "@total-typescript/ts-reset";
import { ParserKaz } from "@whitebird/kazam-parser-kaz"
import { TransformerReact } from "@whitebird/kazam-transformer-react"
import { TransformerVue } from "@whitebird/kazam-transformer-vue"

const availableParsers = [ParserKaz]
const availableTransformers = [TransformerReact, TransformerVue]

export const getProjectParsersAndTransformers = async (
  projectId: string,
) => {
  const { parserNames, transformerNames } = await database
    .select(
      database.Project,
      (databaseProject) => ({
        filter_single: database.op(databaseProject.id, '=', database.uuid(projectId)),
        parsers: {
          parserName: true,
        },
        transformers: {
          transformerName: true,
        },
      }),
    )
    .run(database.client)
    .then((data) => {
      const parserNames = data?.parsers.map(({ parserName }) => parserName)
      const transformerNames = data?.transformers.map(({ transformerName }) => transformerName)
      return { parserNames, transformerNames }
    })

  const parsers = parserNames?.map((parserName) => {
    const Parser = availableParsers.find((Parser) => {
      return Parser.name.toLowerCase().replace(/^parser/, '') === parserName
    })

    if (Parser === undefined)
      return undefined

    return {
      Parser,
      metadata: new Parser().metadata,
    }
  }).filter(Boolean)

  const transformers = transformerNames?.map((transformerName) => {
    const Transformer = availableTransformers.find((Transformer) => {
      return Transformer.name.toLowerCase().replace(/^transformer/, '') === transformerName
    })

    if (Transformer === undefined)
      return undefined

    return {
      Transformer,
    }
  }).filter(Boolean)

  return {
    parsers,
    transformers,
  }
}
