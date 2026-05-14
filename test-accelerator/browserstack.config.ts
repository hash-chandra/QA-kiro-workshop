import { defineConfig } from '@playwright/test';
import { ENV } from './config/env.config';

export default defineConfig({
  testDir: './tests/ui',
  fullyParallel: true,
  retries: 1,
  workers: 3,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  reporter: [['html'], ['list']],
  use: {
    baseURL: ENV.baseURL,
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
