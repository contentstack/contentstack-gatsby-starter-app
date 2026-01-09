import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('should have alt text on logos', async ({ page }) => {
    await page.goto('/');
    const headerLogo = page.locator('header .logo');
    await expect(headerLogo).toBeVisible();
    const alt = await headerLogo.getAttribute('alt');
    expect(alt).toBeTruthy();
  });

  test('should have semantic header and footer', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should have h1 heading on pages', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1').first()).toBeVisible();

    await page.goto('/about-us');
    await expect(page.locator('h1').first()).toBeVisible();
  });
});
