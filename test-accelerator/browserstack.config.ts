import { defineConfig } from '@playwright/test';
import { baseConfig } from './config/base.config';
import { ENV } from './config/env.config';

export default defineConfig({
  ...baseConfig,
  testDir: './tests/ui',
  // A stray `test.only` would otherwise silently shrink the scheduled run to a single test.
  forbidOnly: ENV.isCI,
  retries: 1,
  workers: 3,
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
    // Required by the CodeBuild `reports` block — without it the scheduled
    // BrowserStack build produces no machine-readable results at all.
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],
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
