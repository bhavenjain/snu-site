import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Project root directory (where index.html is located).
  root: "./",
  // Where to output the built files
  build: {
    outDir: "dist",
  },
  // Base public path when served in development or production.
  base: "/",
  // Server-specific options
  server: {
    port: 3000,
    open: true,
    cors: true
  },
});
