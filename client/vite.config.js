import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://154-56-63-113.cprapid.com:8182/",
    },
  },
  plugins: [react()],
});
