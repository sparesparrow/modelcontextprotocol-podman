import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/frontend/__tests__/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
}); 