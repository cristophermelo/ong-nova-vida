import { defineConfig } from "vite";
import { resolve } from "path";
const root = import.meta.dirname;
export default defineConfig({
  build: {
    outDir: "dist",
    minify: true,
    rollupOptions: {
      input: {
        index: resolve(root, "html/index.html"),
        cadastro: resolve(root, "html/cadastro.html"),
        projetos: resolve(root, "html/projetos.html"),
      },
    },
  },
});
