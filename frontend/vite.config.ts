import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react()
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
})