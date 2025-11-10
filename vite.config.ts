import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ใช้พอร์ต 5555 ตามที่คุณรันไว้
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5555,
    proxy: {
      // ทุกอย่างที่ขึ้นต้น /api จะถูก proxy ไป backend:3000
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
