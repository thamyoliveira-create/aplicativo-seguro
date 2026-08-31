/**
 * Configuração Vitest - Testes Unitários
 * Framework: Vitest (compatível com Jest)
 */

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "tests/",
        "dist/",
        "**/*.test.js"
      ]
    },
    include: ["tests/**/*.test.js"],
    exclude: ["node_modules", "dist"]
  }
});
