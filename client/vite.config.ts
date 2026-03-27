import react from '@vitejs/plugin-react'
import { createRequire } from 'module'
import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig, loadEnv, normalizePath } from 'vite'
import { patchCssModules } from 'vite-css-modules'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import svgr from 'vite-plugin-svgr'

const pdfjsDistPath = path.dirname(
  createRequire(import.meta.url).resolve('pdfjs-dist/package.json'),
)
const pdfWasmDir = normalizePath(path.join(pdfjsDistPath, 'wasm'))

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    resolve: {
      alias: {
        'tapestry-core': path.resolve(__dirname, '../core'),
        'tapestry-core-client': path.resolve(__dirname, '../core-client'),
        'tapestry-shared': path.resolve(__dirname, '../shared'),
      },
    },
    plugins: [
      react(),
      svgr(),
      patchCssModules({ generateSourceTypes: true }),
      viteStaticCopy({
        targets: [{ src: pdfWasmDir, dest: '' }],
      }),
    ],
    server: {
      hmr: env.HMR === 'true',
      host: '0.0.0.0',
    },
    esbuild: {
      target: 'ES2020',
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    },
  }
})
