export const ENV = {
  name: process.env.ENV || 'dev',
  baseURL: process.env.BASE_URL || 'http://localhost:5173',
  apiBaseURL: process.env.API_BASE_URL || 'http://localhost:3000',
  isCI: process.env.CI === 'true',
} as const;
