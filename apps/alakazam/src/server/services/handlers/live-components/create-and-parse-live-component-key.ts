export const createLiveComponentKey = (componentPath: string, projectId: string): string => {
  return Buffer.from(JSON.stringify({ componentPath, projectId })).toString('base64')
}

export const parseLiveComponentKey = (componentKey: string): { componentPath: string, projectId: string } => {
  const result = JSON.parse(Buffer.from(componentKey, 'base64').toString('utf-8'))

  if (typeof result !== 'object' || result === null || typeof result.componentPath !== 'string' || typeof result.projectId !== 'string') {
    throw new Error('Invalid live component key')
  }

  return result
}
