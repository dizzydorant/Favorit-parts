import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  base: "/Favorit-parts/",
  server: {
    proxy: {
      "/hs": {
        target: "https://favorit-parts.ru",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
