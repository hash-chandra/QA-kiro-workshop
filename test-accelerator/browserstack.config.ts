import { defineConfig } from '@playwright/test';
import { baseConfig } from './config/base.config';
import { ENV } from './config/env.config';

export default defineConfig({
  ...baseConfig,
  testDir: './tests/ui',
  retries: 1,
  workers: 3,
  reporter: [['html'], ['list']],
  webServer: [
    {
      command: 'npm --prefix ../qe-playground run start:server',
      url: `${ENV.apiBaseURL}/api/health`,
      reuseExistingServer: !ENV.isCI,
      timeout: 120_000,
      stdout: 'pipe',
      stderr: 'pipe',
    },
    {
      command: 'npm --prefix ../qe-playground run dev:client',
      url: ENV.baseURL,
      reuseExistingServer: !ENV.isCI,
      timeout: 120_000,
      stdout: 'pipe',
      stderr: 'pipe',
    },
  ],
});
