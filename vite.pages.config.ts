import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Local dev uses "/"; build-pages.mjs sets GITHUB_PAGES_BASE for GitHub Pages.
  base: process.env.GITHUB_PAGES_BASE ?? "/",
  plugins: [TanStackRouterVite({ target: "react", autoCodeSplitting: true }), tailwindcss(), react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: ".output/public",
    emptyOutDir: true,
  },
});
