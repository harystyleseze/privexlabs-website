import dns from 'dns'

import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'

import redwood from '@redwoodjs/vite'

// So that Vite will load on localhost instead of `127.0.0.1`.
// See: https://vitejs.dev/config/server-options.html#server-host.
dns.setDefaultResultOrder('verbatim')

const viteConfig: UserConfig = {
  plugins: [redwood()],
  // Redwood 8.9 hard-codes `build.minify: false` (a debugging TODO in
  // @redwoodjs/vite getMergedConfig), which also disables CSS minification.
  // User config is merged last, so this restores minified production output.
  build: {
    minify: 'esbuild',
    cssMinify: true,
  },
}

export default defineConfig(viteConfig)
