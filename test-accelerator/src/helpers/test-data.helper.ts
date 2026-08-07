import { ENV } from '../../config/env.config';

export function uniqueId(prefix = 'test'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function randomEmail(): string {
  return `${uniqueId('user')}@example.com`;
}

export function randomTask(): { title: string; status: string; assignee: string } {
  return {
    title: `Task ${uniqueId()}`,
    status: 'todo',
    assignee: 'tester@playground.dev',
  };
}

export const TEST_USERS = ENV.testUsers;
