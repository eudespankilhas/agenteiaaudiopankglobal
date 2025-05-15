import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: process.env.PORT || 5177,
    host: true,
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      exposedHeaders: ['Content-Length', 'X-Content-Type-Options'],
    },
    proxy: {
      '/api': {
        target: process.env.VITE_OLLAMA_API_URL || 'https://agenteiaaudiopank.vercel.app',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/aitopia': {
        target: 'https://extensions.aitopia.ai',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/aitopia/, ''),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Expose-Headers': 'Content-Length, X-Content-Type-Options'
        }
      }
    },
  },
  plugins: [react()],
});