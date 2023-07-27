import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createStyleImportPlugin } from "vite-plugin-style-import";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createStyleImportPlugin({
      libs: [
        {
          libraryName: "zarm",
          esModule: true,
          resolveStyle: (name) => {
            return `zarm/es/${name}/style/css`;
          },
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      utils: path.resolve(__dirname, "src/utils"), // src 路径
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:7002",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^api/, ""),
      },
    },
  },
});
