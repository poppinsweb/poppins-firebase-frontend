import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // o '@vitejs/plugin-react' si usas ese
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    visualizer({ open: true }) // esto es opcional
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react';
            if (id.includes('react-bootstrap') || id.includes('bootstrap')) return 'bootstrap';
            if (id.includes('jspdf') || id.includes('html2canvas') || id.includes('html2pdf.js')) return 'pdf-tools';
            if (id.includes('sweetalert2')) return 'alerts';
            if (id.includes('axios')) return 'axios';
            if (id.includes('react-select')) return 'select';
            return 'vendor';
          }
        }
      }
    }
  }
});
