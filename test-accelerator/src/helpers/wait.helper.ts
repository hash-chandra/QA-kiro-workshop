import { Page } from '@playwright/test';

export async function waitForNetworkIdle(page: Page, timeout = 5000): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout });
}

export async function retry<T>(fn: () => Promise<T>, attempts = 3, delayMs = 1000): Promise<T> {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      if (i === attempts - 1) throw e;
      const backoff = delayMs * Math.pow(2, i) * (0.5 + Math.random() * 0.5);
      await new Promise((r) => setTimeout(r, backoff));
    }
  }
  throw new Error('Retry exhausted');
}
