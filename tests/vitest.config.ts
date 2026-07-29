import path from "node:path";
import { defineConfig, type UserConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

const config: UserConfig & { test?: Record<string, any> } = {
  plugins: [solidPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  test: {
    globals: true,
    environment: "node",
    setupFiles: [path.resolve(__dirname, "./setup.ts")],
  },
};

export default defineConfig(config);
