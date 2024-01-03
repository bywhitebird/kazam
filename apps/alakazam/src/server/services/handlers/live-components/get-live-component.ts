import { replaceKazamMagicStrings } from "@whitebird/kazam-transform-utils"
import { dbGetTransformation } from "../../database/transformations/get-transformation"
import { parseLiveComponentKey } from "./create-and-parse-live-component-key"

export const getLiveComponent = async (
  { componentKey, propsAccessor, selector }:
    { componentKey: string, propsAccessor: string, selector: string },
) => {
  const { componentPath, projectId } = parseLiveComponentKey(componentKey)

  const transformation = await dbGetTransformation({
    path: componentPath,
    projectId: projectId,
    transformerName: 'alakazam',
  })

  if (transformation?.content === undefined) {
    throw new Error('Transformation not found')
  }

  return replaceKazamMagicStrings(transformation.content, {
    alakazamLiveComponentsPropsAccessor: () => propsAccessor,
    alakazamLiveComponentsSelector: () => JSON.stringify(selector),
  })
}
