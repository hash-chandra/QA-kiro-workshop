import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  name: process.env.ENV || 'dev',
  baseURL: process.env.BASE_URL || 'http://localhost:5173',
  apiBaseURL: process.env.API_BASE_URL || 'http://localhost:3000',
  isCI: process.env.CI === 'true',
  testUsers: {
    admin: {
      email: process.env.ADMIN_EMAIL || 'admin@playground.dev',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      name: 'Admin User',
    },
    tester: {
      email: process.env.TESTER_EMAIL || 'tester@playground.dev',
      password: process.env.TESTER_PASSWORD || 'test123',
      name: 'Test User',
    },
  },
  browserstack: {
    username: process.env.BROWSERSTACK_USERNAME || '',
    accessKey: process.env.BROWSERSTACK_ACCESS_KEY || '',
    buildName: process.env.BROWSERSTACK_BUILD_NAME || `accelerator-${Date.now()}`,
    projectName: process.env.BROWSERSTACK_PROJECT_NAME || 'Test Automation Accelerator',
  },
} as const;
