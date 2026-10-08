import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Sandbox/preview overrides are gated on BASE44_PREVIEW_MODE === '1' so the
// shared configuration keeps its normal behaviour everywhere else.
const isPreview = process.env.BASE44_PREVIEW_MODE === '1';
const sandboxHostDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN;

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    // Bind-mounted source on the sandbox host does not emit inotify events.
    watch: isPreview ? { usePolling: true, interval: 300 } : undefined,
    // The preview proxy forwards the sandbox host, which rotates between
    // environments, so allow the whole domain wildcard rather than one host.
    allowedHosts: isPreview && sandboxHostDomain ? [`.${sandboxHostDomain}`] : undefined,
  },
});
