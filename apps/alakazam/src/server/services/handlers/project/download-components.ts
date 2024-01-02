import jszip from 'jszip'
import { dbGetTransformationsByProject } from '../../database/transformations/get-transformations'

export const downloadComponents = async (
  { userId, projectId }:
  { userId: string, projectId: string },
) => {
  const components = await dbGetTransformationsByProject(projectId, {
    options: {
      auth: { userId },
    },
  })

  const zip = new jszip()

  for (const component of components) {
    for (const transformation of component.transformations) {
      zip.file(`${component.transformer.transformerName}/${transformation.path}`, transformation.content)
    }
  }

  const zipFile = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: {
      level: 9,
    },
  })

  return zipFile
}
