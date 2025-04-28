import { defineConfig, type ServerOptions } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import mkcert from 'vite-plugin-mkcert';

export default defineConfig(({ mode }) => {
  const serverOptions: ServerOptions = {
    host: "::",
    port: 8080,
    strictPort: true,
  };

  // Only configure HTTPS in development
  if (mode === 'development') {
    serverOptions.https = {
      // Let mkcert handle certificates automatically
    };
  }

  return {
    server: serverOptions,
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
      mode === 'development' && mkcert(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
      },
    },
    build: {
      target: 'esnext',
    },
  };
});