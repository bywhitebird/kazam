import type { StorybookConfig } from '@storybook/react-vite'
import { viteFinal as reactViteFinal } from '@storybook/react-vite/preset'

import { viteKazReactPlugin } from './vite-kaz-react-plugin'

export * from '@storybook/react-vite/preset'

export const viteFinal: StorybookConfig['viteFinal'] = async (config, options) => {
  if (reactViteFinal !== undefined)
    config = await reactViteFinal(config, options)

  const { plugins = [] } = config

  plugins.unshift(viteKazReactPlugin())

  return config
}
