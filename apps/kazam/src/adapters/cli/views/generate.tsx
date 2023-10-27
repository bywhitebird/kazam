import path from 'node:path'

import { type AppProps, Text, useApp } from 'ink'
import React, { useEffect, useState } from 'react'

import type { generate } from '../../../application/usecases/generate'
import { generateEvents } from '../../../core/events/generate'
import { Spinner } from '../components/spinner'

export const GenerateView = (
  { generatePromise, setExit }:
  { generatePromise: ReturnType<typeof generate>; setExit?: (exit: AppProps['exit']) => void },
) => {
  const { exit } = useApp()

  const [status, setStatus] = useState<
    | { success: true }
    | { error: string }
    | { pending: true }
  >({ pending: true })
  const [writtenPaths, setWrittenPaths] = useState<string[]>([])

  useEffect(() => {
    setExit?.(exit)

    generatePromise
      .then(() => setStatus({ success: true }))
      .catch((error) => {
        setStatus({ error })
        console.error('ERROR', error)
      })

    generateEvents.on('file-written', filePath =>
      setWrittenPaths(writtenPaths => [...writtenPaths, filePath]),
    )
  }, [])

  if ('success' in status) {
    return <>
      <Text><Text color="green">✔</Text> Successfully generated components</Text>
      {writtenPaths.map(writtenPath =>
        <Text key={writtenPath} color='gray'>{'    '}{path.normalize(writtenPath)}</Text>,
      )}
    </>
  }

  if ('error' in status) {
    return <>
      <Text><Text color="red">✖</Text> {status.error}</Text>
    </>
  }

  return <>
    <Text>
      <Text color="blue">
        <Spinner />
      </Text>
      {' Generating components...'}
    </Text>
  </>
}
