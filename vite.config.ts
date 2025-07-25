import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  test: {
    projects: [
      {
        extends: "./vite.config.ts",
        test: {
          name: "client",
          environment: "browser",
          browser: {
            enabled: true,
            provider: "playwright",
            instances: [{ browser: "chromium" }],
          },
          include: ["tests/**/*.svelte.{test,spec}.{js,ts}"],
          exclude: ["tests/lib/server/**"],
          setupFiles: ["./vitest-setup-client.ts"],
        },
      },
      {
        extends: "./vite.config.ts",
        test: {
          name: "server",
          environment: "node",
          include: ["tests/**/*.{test,spec}.{js,ts}"],
          exclude: [
            "tests/**/*.svelte.{test,spec}.{js,ts}",
            "tests/e2e/*.{test,spec}.{js,ts}",
          ],
        },
      },
    ],
  },
});
