import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://blog-alexander.onrender.com', //lo cambie del http://localhost:3000 al que subie a render
        changeOrigin: true, //tambien se adiciono esto
        secure: false
      }
    }, 
  },
  plugins: [react()],
})
