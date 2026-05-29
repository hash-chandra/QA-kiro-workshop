import { PlaywrightTestConfig } from '@playwright/test';
import { ENV } from './env.config';

export const baseConfig: PlaywrightTestConfig = {
  testDir: './tests',
  fullyParallel: true,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  use: {
    baseURL: ENV.baseURL,
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
};
