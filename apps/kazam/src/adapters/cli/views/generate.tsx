import { type AppProps, Text, useApp } from 'ink'
import React, { useEffect, useState } from 'react'

import type { generate } from '../../../application/usecases/generate'
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

  useEffect(() => {
    setExit?.(exit)

    generatePromise
      .then(() => setStatus({ success: true }))
      .catch((error) => {
        setStatus({ error })
        console.error('ERROR', error)
      })
  }, [])

  if ('success' in status) {
    return <>
      <Text><Text color="green">✔</Text> Generated code successfully</Text>
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
      {' Generating...'}
    </Text>
  </>
}
