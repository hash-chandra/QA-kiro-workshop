import { defineConfig } from '@playwright/test';
import { baseConfig } from './config/base.config';

export default defineConfig({
  ...baseConfig,
  testDir: './tests/ui',
  retries: 1,
  workers: 3,
  reporter: [['html'], ['list']],
});
