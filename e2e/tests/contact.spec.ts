import { test, expect } from '../fixtures';

test.describe('Contact Page', () => {
  test('should load with header and footer', async ({ contactPage }) => {
    await contactPage.goto();
    expect(await contactPage.isHeaderVisible()).toBe(true);
    expect(await contactPage.isFooterVisible()).toBe(true);
  });

  test('should have correct URL', async ({ contactPage }) => {
    await contactPage.goto();
    expect(await contactPage.getCurrentUrl()).toContain('/contact-us');
  });

  test('should have main content', async ({ contactPage }) => {
    await contactPage.goto();
    expect(await contactPage.hasMainContent()).toBe(true);
  });

  test('should navigate to About page', async ({ contactPage }) => {
    await contactPage.goto();
    await contactPage.clickNavItem('About');
    expect(await contactPage.getCurrentUrl()).toContain('/about');
  });

  test('should navigate home via logo', async ({ contactPage }) => {
    await contactPage.goto();
    await contactPage.clickLogo();
    expect(await contactPage.getCurrentUrl()).toMatch(/\/$|:8000\/?$/);
  });
});
