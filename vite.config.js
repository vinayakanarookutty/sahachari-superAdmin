import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


// export default defineConfig({
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://d17p315up9p1ok.cloudfront.net',
//         changeOrigin: true,
//         secure: false,
//       }
//     }
//   }
// });

