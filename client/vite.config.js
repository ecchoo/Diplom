import react from '@vitejs/plugin-react'

import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    optimizeDeps: {
      exclude: ['js-big-decimal']
    },
    define: {
      'process.env': env,
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  }
})

