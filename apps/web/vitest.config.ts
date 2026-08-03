import path from "node:path";
import { defineConfig, type UserConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

const config: UserConfig & { test?: Record<string, any> } = {
  plugins: [solidPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "node",
    setupFiles: [path.resolve(import.meta.dirname, "./tests/setup.ts")],
    include: ["tests/**/*.test.{ts,tsx}", "tests/**/*.spec.{ts,tsx}"],
    exclude: ["e2e/**", "node_modules/**", "dist/**"],
  },
};

export default defineConfig(config);