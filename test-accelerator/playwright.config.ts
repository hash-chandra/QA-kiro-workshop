import { defineConfig, devices } from '@playwright/test';
import { baseConfig } from './config/base.config';
import { ENV } from './config/env.config';

export default defineConfig({
  ...baseConfig,
  forbidOnly: ENV.isCI,
  retries: ENV.isCI ? 2 : 0,
  workers: ENV.isCI ? 1 : undefined,
  reporter: [['html'], ['list'], ['json', { outputFile: 'test-results/results.json' }]],
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
  projects: [
    {
      name: 'ui-chromium',
      testDir: './tests/ui',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: { baseURL: ENV.apiBaseURL },
    },
  ],
});
