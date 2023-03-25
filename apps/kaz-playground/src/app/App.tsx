import { useCallback, useContext, useEffect, useState } from 'react'

import { manifestContext } from './manifest'

import './index.css'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { MemoizedKazEditor } from './components/editor/kaz-editor'
import { AstOutput } from './components/output/ast-output'
import { Docs } from './components/docs/docs'

import githubLogoWhite from '../assets/github-logo-white.svg'

const tabs: Record<string, { name: string, content: React.FunctionComponent<any> }>[] = [
  {
    editor: {
      name: 'Editor',
      // content: <KazEditor onCodeChange={setKazCode} />
      content: ({ onCodeChange, initialCode }: { onCodeChange: (code: string) => void, initialCode?: string }) => {
        return <MemoizedKazEditor onCodeChange={onCodeChange} initialCode={initialCode} />
      },
    },
    docs: {
      name: 'Docs',
      content: () => {
        return <Docs />
      },
    },
  },
  {
    output: {
      name: 'Output',
      // content: <AstOutput code={kazCode} />
      content: ({ code }: { code: string }) => {
        return <AstOutput code={code} />
      },
    },
  },
]

export function App() {
  const [kazCode, setKazCode] = useState<string>()
  const [unifiedTabs, setUnifiedTabs] = useState(false)

  const onResize = useCallback(() => {
    const width = window.innerWidth
    const height = window.innerHeight

    if (unifiedTabs && width > height) {
      setUnifiedTabs(false)
    } else if (!unifiedTabs && width < height) {
      setUnifiedTabs(true)
    }
  }, [unifiedTabs, setUnifiedTabs])

  useEffect(() => {
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [onResize])

  return (
    <html>
      <head>
        <title>Kaz Playground</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"></link>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk&family=Space+Mono&display=swap" rel="stylesheet"></link>
      </head>
      <body className="h-screen w-screen overflow-hidden flex flex-col font-sans">
        <main className="App flex h-auto w-screen overflow-hidden bg-gray-900 flex-1">
          {
            unifiedTabs
              ? <>
                <Tabs defaultValue={Object.keys(tabs[0] ?? {})[0] ?? ''} className="w-[100%] h-[100%] flex flex-col">
                  <TabsList className="self-baseline">
                    {
                      tabs.flatMap((tab) => Object.entries(tab).map(([key, { name }]) => (
                        <TabsTrigger key={key} value={key}>{name}</TabsTrigger>
                      )))
                    }
                  </TabsList>
                  {
                    tabs.flatMap((tab) => Object.entries(tab).map(([key, { content }]) => (
                      <TabsContent key={key} value={key} className="contents">
                        {content({ onCodeChange: setKazCode, code: kazCode, initialCode: kazCode })}
                      </TabsContent>
                    )))
                  }
                </Tabs>
              </>
              : <>
                {
                  tabs.map((tab, i) => (
                    <Tabs defaultValue={Object.keys(tab)[0] ?? ''} className="w-[50%] h-[100%] flex flex-col" key={i}>
                      <TabsList className="self-baseline">
                        {
                          Object.entries(tab).map(([key, { name }]) => (
                            <TabsTrigger key={key} value={key}>{name}</TabsTrigger>
                          ))
                        }
                      </TabsList>
                      {
                        Object.entries(tab).map(([key, { content }]) => (
                          <TabsContent key={key} value={key} className="contents">
                            {content({ onCodeChange: setKazCode, code: kazCode, initialCode: kazCode })}
                          </TabsContent>
                        ))
                      }
                    </Tabs>
                  ))
                }
              </>
          }
        </main>
        <footer className="bg-gray-900 text-gray-100 py-2 px-4">
          <div className="flex justify-end">
            <a href="https://github.com/bywhitebird/kazam/tree/feature/9-create-a-parser-for-kaz-file/packages/kaz-file-parser" target="_blank" rel="noreferrer">
              <img src={githubLogoWhite} alt="GitHub Logo" className="h-6 w-6" />
            </a>
          </div>
        </footer>
        <Scripts />
      </body>
    </html>
  )
}

function Scripts() {
  const manifest = useContext(manifestContext)
  return import.meta.env.DEV ? (
    <>
      <script type="module" src="/@vite/client"></script>
      <script type="module" src="/src/app/entry-client.tsx"></script>
    </>
  ) : (
    <>
      <script type="module" src={manifest['entry-client']}></script>
    </>
  )
}
