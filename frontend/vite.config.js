import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          // 이 부분을 수정해주세요!
          // .wasm 파일과 .mjs 파일을 모두 복사하도록 변경합니다.
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
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  }
})