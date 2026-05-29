import { defineConfig, devices } from '@playwright/test';
import { baseConfig } from './config/base.config';
import { ENV } from './config/env.config';

export default defineConfig({
  ...baseConfig,
  forbidOnly: ENV.isCI,
  retries: ENV.isCI ? 2 : 0,
  workers: ENV.isCI ? 1 : undefined,
  reporter: [['html'], ['list'], ['json', { outputFile: 'test-results/results.json' }]],
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
