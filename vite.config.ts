import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { configDefaults } from "vitest/config";
import { visualizer } from "rollup-plugin-visualizer";

const analyze = process.env.ANALYZE === "true";

export default defineConfig({
  plugins: [
    react(),
    ...(analyze
      ? [
          visualizer({
            filename: "dist/stats.html",
            gzipSize: true,
            brotliSize: true,
            template: "treemap",
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@tests": path.resolve(__dirname, "tests"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    exclude: [...configDefaults.exclude, "e2e/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "lcov"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "**/node_modules/**",
        "dist/",
        "tests/",
        "**/*.test.{ts,tsx}",
        "**/*.config.{ts,js,mjs,cjs}",
        "src/vite-env.d.ts",
        "coverage/",
        "**/types/**",
        "tailwind.config.ts",
      ],
      reportOnFailure: true,
    },
  },
});
