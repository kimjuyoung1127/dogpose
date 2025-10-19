import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import basicSsl from '@vitejs/plugin-basic-ssl' // 1. 이 줄을 추가하세요.

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    basicSsl(), // 2. 이 줄을 추가하세요.
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/onnxruntime-web/dist/*.{wasm,mjs}',
          dest: 'wasm'
        }
      ]
    })
  ],
  optimizeDeps: {
    exclude: ['onnxruntime-web'],
  },
  server: {
     host: true,
     https: true, // basicSsl() 플러그인이 이 설정을 보고 작동합니다.
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  }
})