import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';
import analyze from 'rollup-plugin-analyzer';

// bundle analyzer를 까려고 했을 떄, 빌드가 LIBRARY MODE로 되는데, 왜 그런 것일까???
// https://vitejs.dev/config/
export default defineConfig({
  // build: {
  //   rollupOptions: {
  //     plugins: [analyze()]
  //   },
  //   target: "es2015",
  //   lib: {
  //     entry: "src/app.tsx",
  //     formats: ["umd"],
  //     name: "App"
  //   }
  // },
  plugins: [react(),],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ]
  }
})
