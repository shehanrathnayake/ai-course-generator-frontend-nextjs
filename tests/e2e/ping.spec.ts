import { test, expect } from '@playwright/test';

test('PingClient shows backend response', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000');

  await page.waitForSelector('[data-testid="ping-display"]', {
    timeout: 10_000,
  });

  await page.waitForTimeout(5_000);

  const text = await page.textContent('[data-testid="ping-display"]');
  expect(text).toContain('pong');
});
