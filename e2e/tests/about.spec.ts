import { test, expect } from '../fixtures';

test.describe('About Page', () => {
  test('should load with header and footer', async ({ aboutPage }) => {
    await aboutPage.goto();
    expect(await aboutPage.isHeaderVisible()).toBe(true);
    expect(await aboutPage.isFooterVisible()).toBe(true);
  });

  test('should have correct URL', async ({ aboutPage }) => {
    await aboutPage.goto();
    expect(await aboutPage.getCurrentUrl()).toContain('/about-us');
  });

  test('should have hero banner', async ({ aboutPage }) => {
    await aboutPage.goto();
    expect(await aboutPage.isHeroBannerVisible()).toBe(true);
  });

  test('should navigate to Blog page', async ({ aboutPage }) => {
    await aboutPage.goto();
    await aboutPage.clickNavItem('Blog');
    expect(await aboutPage.getCurrentUrl()).toContain('/blog');
  });

  test('should navigate home via logo', async ({ aboutPage }) => {
    await aboutPage.goto();
    await aboutPage.clickLogo();
    expect(await aboutPage.getCurrentUrl()).toMatch(/\/$|:8000\/?$/);
  });
});
