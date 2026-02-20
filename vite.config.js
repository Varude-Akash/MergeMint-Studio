import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        mergePdf: resolve(__dirname, "merge-pdf/index.html"),
        splitPdf: resolve(__dirname, "split-pdf/index.html"),
        mergeText: resolve(__dirname, "merge-text/index.html"),
        mergeCsv: resolve(__dirname, "merge-csv/index.html")
      }
    }
  }
});
