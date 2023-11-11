import path from 'node:path'

import { type AppProps, Text, useApp } from 'ink'
import React, { useEffect, useLayoutEffect, useState } from 'react'

import { generateEvents } from '../../../core/events/generate'
import { Spinner } from '../components/spinner'

export const GenerateView = (
  { setExit }:
  { setExit?: (exit: AppProps['exit']) => void },
) => {
  const { exit } = useApp()

  const [status, setStatus] = useState<
    | { success: true }
    | { error: string }
    | { pending: true }
  >(
    generateEvents.hasReceived('success')
      ? { success: true }
      : generateEvents.hasReceived('error')
        ? { error: generateEvents.getLatestReceived('error')!.message }
        : { pending: true },
  )
  const [writtenPaths, setWrittenPaths] = useState(new Set<string>())

  useLayoutEffect(() => {
    generateEvents.on('pending', () => {
      setStatus({ pending: true })
      setWrittenPaths(new Set())
    })

    generateEvents.on('success', () => {
      setStatus({ success: true })
    })

    generateEvents.on('error', (error) => {
      setStatus({ error: error.message })
      console.error('ERROR', error)
    })

    generateEvents.on('file-written', filePath =>
      setWrittenPaths(writtenPaths => writtenPaths.add(filePath)),
    )
  }, [])

  useEffect(() => {
    setExit?.(exit)
  }, [])

  if ('success' in status) {
    return <>
      <Text><Text color="green">✔</Text> Successfully generated components</Text>
      {Array.from(writtenPaths.values()).map(writtenPath =>
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
