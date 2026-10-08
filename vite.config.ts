import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// In the Base44 sandbox the preview is served through a proxy whose host
// changes per environment, so the allowed-host list must be built from the
// environment rather than hardcoded. Outside preview mode nothing is added and
// Vite keeps its default (localhost-only) behaviour.
const sandboxDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN
const previewHosts =
  process.env.BASE44_PREVIEW_MODE === '1' && sandboxDomain
    ? ['.' + sandboxDomain]
    : []

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    allowedHosts: [...previewHosts, 'localhost', '127.0.0.1'],
  },
})
