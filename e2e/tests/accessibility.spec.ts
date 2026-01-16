import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('should have alt text on logos', async ({ page }) => {
    await page.goto('/');
    await page.locator('header.header').waitFor({ state: 'visible' });
    const headerLogo = page.locator('header.header .logo');
    await expect(headerLogo).toBeVisible();
    const alt = await headerLogo.getAttribute('alt');
    expect(alt).toBeTruthy();
  });

  test('should have semantic header and footer', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header.header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should have h1 heading on pages', async ({ page }) => {
    await page.goto('/');
    await page.locator('header.header').waitFor({ state: 'visible' });
    await expect(page.locator('h1').first()).toBeVisible();

    await page.goto('/about-us');
    await page.locator('header.header').waitFor({ state: 'visible' });
    await expect(page.locator('h1').first()).toBeVisible();
  });
});
