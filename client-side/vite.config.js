import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mui/lab/DatePicker': '@mui/lab/DatePicker',
    },
  },
  optimizeDeps: {
    include: ['axios'],
  },
});
