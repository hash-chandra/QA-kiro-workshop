import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  name: process.env.ENV || 'dev',
  baseURL: process.env.BASE_URL || 'http://localhost:5173',
  apiBaseURL: process.env.API_BASE_URL || 'http://localhost:3000',
  isCI: process.env.CI === 'true',
  browserstack: {
    username: process.env.BROWSERSTACK_USERNAME || '',
    accessKey: process.env.BROWSERSTACK_ACCESS_KEY || '',
    buildName: process.env.BROWSERSTACK_BUILD_NAME || `accelerator-${Date.now()}`,
    projectName: process.env.BROWSERSTACK_PROJECT_NAME || 'Test Automation Accelerator',
  },
} as const;
