import { defineConfig } from 'astro/config'
import react from "@astrojs/react"
import node from '@astrojs/node'
import tailwind from "@astrojs/tailwind"
import { astroBling } from '@tanstack/bling/astro'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [astroBling(), react(), tailwind()],
});