import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@api": "/src/api",
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@layouts": "/src/layouts",
      "@models": "/src/models",
      "@pages": "/src/pages",
      "@services": "/src/services",
      "@store": "/src/store",
      "@themes": "/src/themes",
      "@types": "/src/types",
      "@utils": "/src/utils",
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
