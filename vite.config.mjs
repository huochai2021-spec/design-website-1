import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function prefixPublicAssetUrls() {
  let base = "/";

  return {
    name: "prefix-public-asset-urls",
    configResolved(config) {
      base = config.base;
    },
    renderChunk(code) {
      if (base === "/") return null;
      return {
        code: code.replace(/(["'])\/assets\//g, `$1${base}assets/`),
        map: null,
      };
    },
    generateBundle(_, bundle) {
      if (base === "/") return;
      for (const file of Object.values(bundle)) {
        if (file.type !== "asset" || !file.fileName.endsWith(".css") || typeof file.source !== "string") continue;
        file.source = file.source.replace(/url\((["'])?\/assets\//g, `url($1${base}assets/`);
      }
    },
  };
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  // Local development keeps access to the full reference asset library. The
  // deployment build uses the trimmed asset set that the live portfolio needs.
  publicDir: process.env.VITE_PUBLIC_DIR || "public",
  build: {
    outDir: "dist/client",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react(), prefixPublicAssetUrls()],
});
