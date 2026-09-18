import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    globals: true,
    testTimeout: 10 * 60_000,
    hookTimeout: 10 * 60_000,
    reporters: ['verbose'],
    include: ['src/test/**/*.test.ts'],
    poolOptions: { threads: { singleThread: true } },
  },
});
