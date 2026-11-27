import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  // Firebase Hosting serves this folder (see firebase.json)
  build: { outDir: "build" },
});
